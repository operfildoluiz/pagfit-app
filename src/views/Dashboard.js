import React, { Component } from 'react';
import { AsyncStorage, View, StyleSheet, Text } from 'react-native';
import UserService from '../services/UserService';
import Balance from '../components/Balance';
import TransactionList from '../components/TransactionList';
import Format from '../config/helper/format';
import Menu from '../components/Menu';
import SideMenu from 'react-native-side-menu';
import configApp from '../config/app';

export default class Dashboard extends Component {

    daysHistory = 3;

    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#0B8B40',
            },
            headerTitle: configApp.getTag('header_dashboard'),
        };
    };

    state = {
        user: null,
        date: configApp.getTag('sometimes'),
        api_token: this.props.navigation.getParam('api_token'),
        transactions: null,
        isOpen: false,
        selectedItem: 'Dashboard',
    };

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

    onMenuItemSelected = item =>
        this.setState({
            isOpen: false,
            selectedItem: item,
        });

    componentDidMount() {
        this.subs = [
            this.props.navigation.addListener('didFocus', () => this.getData()),
        ];
    }

    componentWillUnmount() {
        this.subs.forEach(sub => sub.remove());
    }

    getData() {
        let vm = this;

        AsyncStorage.getItem('bearer', (err, result) => {

            UserService.getUser(result).then(res => {
                vm.setState({ user: res.data.data });
            });

            UserService.getHistory(result, this.daysHistory).then(res => {
                vm.setState({
                    transactions: res.data.data,
                    date: res.data.data[0] !== undefined ? Format.date(res.data.data[res.data.data.length - 1].created_at) : vm.state.date
                });
            });

        });
    }

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    render() {
        const menu = <Menu onItemSelected={this.onMenuItemSelected} navigation={this.props.navigation} />;

        return (
            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                onChange={isOpen => this.updateMenuState(isOpen)}
            >
                <View style={styles.container}>
                    {this.state.user !== null && this.state.transactions !== null ?
                        <View style={{ width: '90%', marginTop: '5%', marginBottom: '5%', }}>
                            <Balance balance={this.state.user.account.balance} date={this.state.date} />

                            <View>
                                <TransactionList transactions={this.state.transactions} days={this.daysHistory} />
                            </View>

                        </View>
                        : null}
                </View>
            </SideMenu>
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

