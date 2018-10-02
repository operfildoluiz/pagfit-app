import React, { Component } from 'react';
import { AsyncStorage, TextInput, View, Text, StyleSheet, Button } from 'react-native';
import Menu from '../components/Menu';
import SideMenu from 'react-native-side-menu';
import configApp from '../config/app';
import UserService from '../services/UserService';

export default class BankAccountForm extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#0B8B40',
            },
            headerTitle: configApp.getTag('header_manage_bank_account'),
        };
    };

    state = {
        id: null,
        bank_code: '',
        agency_number: '',
        account_number: '',
        isOpen: false,
        selectedItem: 'BankAccountForm',
    };

    handleSubmit() {
        var vm = this;

        AsyncStorage.getItem('bearer', (err, result) => {

            let obj = {
                id: this.state.id,
                agency_number: this.state.agency_number,
                account_number: this.state.account_number,
                bank_code: this.state.bank_code,
                is_confirmed: false,

            }

            UserService.editOrCreateBankAccount(obj, result).then(res => {
                vm.setState({ 
                    id: null,
                    bank_code: '',
                    agency_number: '',
                    account_number: ''
                });
                vm.props.navigation.navigate('BankAccountScreen', { api_token: result });
            })

        });
    }

    handleDelete(id) {
        var vm = this;

        AsyncStorage.getItem('bearer', (err, result) => {

            UserService.deleteBankAccount(result, id).then(res => {
                vm.setState({ 
                    id: null,
                    bank_code: '',
                    agency_number: '',
                    account_number: ''
                });
                vm.props.navigation.navigate('BankAccountScreen', { api_token: result });
            })

        });
    }

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
        var vm = this;

        if (this.props.navigation.getParam('id') !== null) {
            AsyncStorage.getItem('bearer', (err, result) => {
                UserService.getBankAccount(result, this.props.navigation.getParam('id')).then(res => {
                    let acc = res.data.data;
                    vm.setState({
                        id: acc.id,
                        agency_number: acc.agency_number,
                        account_number: acc.account_number,
                        bank_code: acc.bank.bacen_code,
                    })
                })
            });
        }
    }

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);

        this.getData();
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
                    <View style={styles.form}>
                        <Text style={styles.label}>{configApp.getTag('lbl_agency_number')}:</Text>
                        <TextInput 
                            value={this.state.agency_number}
                            style={styles.input}
                            onChangeText={(e) => this.setState({ agency_number: e })} 
                            />

                        <Text style={styles.label}>{configApp.getTag('lbl_account_number')}:</Text>
                        <TextInput 
                            value={this.state.account_number}
                            style={styles.input}
                            onChangeText={(e) => this.setState({ account_number: e })} 
                            />

                        <Text style={styles.label}>{configApp.getTag('lbl_bank_code')}:</Text>
                        <TextInput 
                            value={this.state.bank_code}
                            style={styles.input}
                            onChangeText={(e) => this.setState({ bank_code: e })} 
                            />
                                                

                        <View style={styles.button}>
                            <Button
                                title={configApp.getTag('btn_save')}
                                onPress={() => this.handleSubmit()}
                                color="#55CE63"
                            />
                        </View>

                        {this.state.id === null ? null : 
                        <View style={styles.buttonDelete}>
                            <Button
                                title={configApp.getTag('btn_delete')}
                                onPress={() => this.handleDelete(this.state.id)}
                                color="#ff0000"
                            />
                        </View>
                        }
                    </View>
                </View>
            </SideMenu >
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ECF1F2',
        flex: 1,
        alignItems: 'center'
    },
    form: {
        backgroundColor: '#FFF',
        padding: 15,
        width: '90%',
        marginTop: '5%',
        marginBottom: '5%'
    },
    button: {
        width: '100%',
    },
    buttonDelete: {
        width: '100%',
        marginTop: 100,
    },
    input: {
        backgroundColor: '#fff',
        height: 50,
        width: '100%',
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#BFC7C4',
        padding: 5,
        marginBottom: 10,
    },
    label: {
        width: '100%',
        textAlign: 'left'
    },
    helper: {
        width: '100%',
        fontSize: 11,
        color: '#BFC7C4',
        textAlign: 'left',
        marginBottom: 5,
    }
});

