import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, AsyncStorage } from 'react-native';
import UserService from '../services/UserService';
import BankAccountList from '../components/BankAccountList';
import Menu from '../components/Menu';
import SideMenu from 'react-native-side-menu';
import configApp from '../config/app';

export default class BankAccountScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#0B8B40',
            },
            headerTitle: configApp.getTag('header_bank_accounts'),
        };
    };

    state = {
        token: this.props.navigation.getParam('api_token'),
        bank_accounts: null,
        isOpen: false,
        selectedItem: 'BankAccountScreen',
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

    getData() {
        let vm = this;
        UserService.getUserBankAccounts(this.state.token).then(res => {
            vm.setState({
                bank_accounts: res.data.data,
            });
        });
    }

    componentDidMount() {
        let vm = this;
        AsyncStorage.getItem('bearer', (err, result) => {
            vm.setState({ token: result }, () => {
                vm.subs = [
                    vm.props.navigation.addListener('didFocus', () => vm.getData()),
                ];
            })
        });
    }
    
    componentWillUnmount() {
        this.subs.forEach(sub => sub.remove());
    }    

    handleClick(e) {
        this.props.navigation.navigate('BankAccountForm', { id: e });
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
                    {this.state.user !== null && this.state.bank_accounts !== null ?
                        <ScrollView>
                            <View style={{ marginBottom: '5%', }}>
                                <BankAccountList bank_accounts={this.state.bank_accounts} onClick={this.handleClick.bind(this)} />
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

