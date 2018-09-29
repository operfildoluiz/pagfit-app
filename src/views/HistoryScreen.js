import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Picker, Text, AsyncStorage } from 'react-native';
import UserService from '../services/UserService';
import TransactionList from '../components/TransactionList';
import Menu from '../components/Menu';
import SideMenu from 'react-native-side-menu';
import configApp from '../config/app';

export default class HistoryScreen extends Component {

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
        since: 1,
        token: this.props.navigation.getParam('api_token'),
        transactions: null,
        isOpen: false,
        selectedItem: 'HistoryScreen',
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

    getData(since = 1) {
        let vm = this;
        UserService.getHistory(this.state.token, since).then(res => {
            vm.setState({
                transactions: res.data,
                since
            });
        });
    }

    componentDidMount() {
        let vm = this;
        AsyncStorage.getItem('bearer', (err, result) => {
            vm.setState({token: result}, () => vm.getData())
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
                        <ScrollView>
                            <View style={styles.containerChild}>
                                <Text style={styles.label}>{configApp.getTag('lbl_get_last_days')}:</Text>
                                <Picker
                                    selectedValue={this.state.since}
                                    style={styles.input}
                                    onValueChange={(itemValue, itemIndex) => this.getData(itemValue)}>
                                    <Picker.Item label='Hoje' value={1} />
                                    <Picker.Item label='Últimos 3 dias' value={3} />
                                    <Picker.Item label='Últimos 5 dias' value={5} />
                                    <Picker.Item label='Últimos 7 dias' value={7} />
                                    <Picker.Item label='Últimos 15 dias' value={15} />
                                    <Picker.Item label='Últimos 30 dias' value={30} />
                                    <Picker.Item label='Últimos 60 dias' value={60} />
                                </Picker>
                            </View>
                            <View style={{ marginTop: '5%', marginBottom: '5%', }}>

                                {this.state.transactions !== null ?
                                    <View style={{ marginBottom: '5%', }}>
                                        <TransactionList transactions={this.state.transactions} days={this.state.since} />
                                    </View>
                                    : null}
                            </View>
                        </ScrollView>
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
    },
    containerChild: {
        backgroundColor: '#FFF',
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
        padding: 15,
        textAlign: 'left'
    }
});

