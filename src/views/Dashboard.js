import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import UserService from '../services/UserService';
import Balance from '../components/Balance';
import TransactionList from '../components/TransactionList';
import Format from '../config/helper/format';

export default class Dashboard extends Component {

    daysHistory = 3;

    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#0B8B40',
            },
            headerTitle: 'Dashboard',
        };
    };

    state = {
        user: null,
        date: '10/09/2018',
        api_token: this.props.navigation.getParam('api_token'),
        transactions: null
    };

    componentDidMount() {
        let vm = this;
        UserService.getUser(this.state.api_token).then(res => {
            vm.setState({ user: res.data.data });
        });
        UserService.getHistory(this.state.api_token, this.daysHistory).then(res => {
            vm.setState({ 
                transactions: res.data.data,
                date: res.data.data[0] !== undefined ? Format.date(res.data.data[res.data.data.length-1].created_at) : vm.state.date
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.user !== null && this.state.transactions !== null ?
                    <View style={{width: '90%', marginTop: '5%', marginBottom: '5%', }}>
                        <Balance balance={this.state.user.account.balance} date={this.state.date} />
                        <TransactionList transactions={this.state.transactions} days={this.daysHistory} />
                    </View>
                    : null}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ECF1F2',
        flex: 1,
        alignItems: 'center'
    },
    button: {
        width: 300,
        margin: 10
    },
    input: {
        backgroundColor: '#fff',
        height: 50,
        width: 300,
        borderRadius: 5,
        margin: 10
    },
    label: {
        width: 300,
        color: 'white',
        textAlign: 'left'
    }
});

