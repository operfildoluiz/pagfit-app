import React, { Component } from 'react';
import { AsyncStorage, View, Text, StyleSheet, Button, Picker } from 'react-native';
import Menu from '../components/Menu';
import SideMenu from 'react-native-side-menu';
import configApp from '../config/app';
import { TextInputMask } from 'react-native-masked-text'
import format from '../config/helper/format';
import OpsService from '../services/OpsService';
import UserService from '../services/UserService';

export default class WithdrawalForm extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#0B8B40',
            },
            headerTitle: configApp.getTag('header_withdrawal'),
        };
    };

    state = {
        quota: 0,
        isOpen: false,
        accounts: null,
        bank_account_id: null,
        selectedItem: 'WithdrawalForm',
    };

    handleSubmit() {
        var vm = this;

        let cur = format.cleanCurrency(this.state.quota);

        AsyncStorage.getItem('bearer', (err, result) => {

            OpsService.scheduleWithdrawal({
                quota: cur,
                date: "00000000",
                bank_account_id: parseInt(this.state.bank_account_id)
            }, result).then(res => {
                vm.setState({ quota: 0, bank_account_id: null });
                vm.props.navigation.navigate('WithdrawalConfirm', { withdrawal: res.data.data });
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

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        let vm = this;
        AsyncStorage.getItem('bearer', (err, result) => {
            UserService.getUserBankAccounts(result).then(function (res) {
                vm.setState({ accounts: res.data.data, bank_account_id: res.data.data[0].id  });
            });
        });
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
                        <Text style={styles.label}>{configApp.getTag('lbl_total_quota')}:</Text>
                        <TextInputMask
                            value={this.state.quota}
                            style={styles.input} onChangeText={(e) => this.setState({ quota: e })}
                            type={'money'}
                            options={{ unit: 'R$', separator: ',', delimiter: '.' }}
                        />
                        <Text style={styles.helper}>{configApp.getTag('hp_just_a_request')}</Text>


                        <Text style={styles.label}>{configApp.getTag('lbl_bank_account')}:</Text>
                        <Picker
                            selectedValue={this.state.bank_account_id}
                            style={styles.input}
                            onValueChange={(itemValue, itemIndex) => this.setState({ bank_account_id: itemValue })}>
                            {this.state.accounts !== null ? 
                                this.state.accounts.map((acc, i) => (
                                    <Picker.Item key={i} label={`${acc.bank.name} ${acc.agency_number} ${acc.account_number}`} value={acc.id} />
                                ))
                            : null}
                        </Picker>

                        <View style={styles.button}>
                            <Button
                                title={configApp.getTag('btn_request_withdrawal')}
                                onPress={() => this.handleSubmit()}
                                color="#55CE63"
                            />
                        </View>
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
    input: {
        backgroundColor: '#fff',
        height: 50,
        width: '100%',
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#BFC7C4',
        padding: 5,
        marginBottom: 5,
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
        marginBottom: 10,
    }
});

