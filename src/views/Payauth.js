import React, { Component } from 'react';
import { AsyncStorage, View, Text, TextInput, StyleSheet, Button } from 'react-native';
import Menu from '../components/Menu';
import SideMenu from 'react-native-side-menu';
import configApp from '../config/app';
import OpsService from '../services/OpsService';
import { Buffer } from 'buffer';

export default class Payauth extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#0B8B40',
            },
            headerTitle: configApp.getTag('header_payauth'),
        };
    };

    state = {
        paylink: this.props.navigation.getParam('paylink'),
        password: '',
        isOpen: false,
        selectedItem: 'Payauth',
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

    validPass() {
        return (this.state.password.length === 4);
    }

    handleSubmit() {
        var vm = this;

        AsyncStorage.getItem('bearer', (err, result) => {
            OpsService.getPayauthToken({
                payauth_pincode: Buffer.from(this.state.password).toString('base64'),
            }, result).then(res => {
                vm.setState({ password: '' });
                if(res.data.data.payauth_token !== undefined) {
                    OpsService.pay({
                        paylink: this.state.paylink,
                        payauth_token: res.data.data.payauth_token
                      }, result).then(res => {
                        alert('Pagou, exibir comprovante');
                      });
                } else {
                    alert('Senha invalida');
                }
                // vm.props.navigation.navigate('PaylinkShare', { paylink: res.data.data });
            })

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
                    <View style={styles.form}>
                        <Text style={styles.label}>{configApp.getTag('lbl_4digit_password')}:</Text>

                        <TextInput
                            placeholder="* * * *"
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            onChangeText={(e) => { this.setState({ password: e }) }}
                            keyboardType="numeric"
                            textContentType="password"
                            secureTextEntry={true}
                        />

                        <View style={styles.button}>
                            <Button
                                disabled={!this.validPass()}
                                title={configApp.getTag('btn_pay')}
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
        marginBottom: '5%',
    },
    button: {
        width: '100%',
    },
    input: {
        backgroundColor: '#fff',
        height: 100,
        width: '100%',
        textAlign: 'center',
        fontSize: 24,
        padding: 5,
        marginTop: 15,
        marginBottom: 15,
    },
    label: {
        width: '100%',
        textAlign: 'left'
    },
});

