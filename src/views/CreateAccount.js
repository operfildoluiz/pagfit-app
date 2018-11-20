import React, { Component } from 'react';
import { AsyncStorage, View, Button, Text, TextInput, StyleSheet, Image } from 'react-native';
import AuthService from '../services/AuthService';
import { Buffer } from 'buffer';
import configApp from '../config/app';

export default class CreateAccount extends Component {

    static navigationOptions = {
        header: null
    }

    state = {};

    handleSubmit() {
        var vm = this;

        let obj = {
            name: this.state.name,
            nickname: this.state.name.replace(/\s/g, "").toLowerCase(),
            email: this.state.email,
            cpf: this.state.cpf,
            birthdate: "00000000",
            city: "Cidade",
            state: "UF",
            password: Buffer.from(this.state.password).toString('base64'),
            payauth_pincode: Buffer.from(this.state.pincode).toString('base64'),
            mobile_number: this.state.mobile_number,
            gender: "M",
            is_active: 1
        }

        AuthService.register(obj).then((responseJson) => {
            if (responseJson.data.status === "success") {
                AsyncStorage.setItem('bearer', 'Bearer ' + responseJson.data.data.api_token, () => {
                    vm.props.navigation.navigate('BankAccountScreen', {api_token: responseJson.data.data.api_token});
                });
            } else {
                alert(configApp.getTag('fback_invalid_credentials'));
            }
        })
        .catch((error) => {
            alert(configApp.getTag('fback_ops'));
        });

    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.label}>{configApp.getTag('lbl_name')}:</Text>
                <TextInput value={this.state.name} style={styles.input} underlineColorAndroid="transparent" onChangeText={(e) => this.setState({ name: e })} keyboardType="number-pad" />

                <Text style={styles.label}>{configApp.getTag('lbl_email')}:</Text>
                <TextInput value={this.state.email} style={styles.input} underlineColorAndroid="transparent" onChangeText={(e) => this.setState({ email: e })} keyboardType="number-pad" />

                <Text style={styles.label}>{configApp.getTag('lbl_mobile_number')}:</Text>
                <TextInput value={this.state.mobile_number} style={styles.input} underlineColorAndroid="transparent" onChangeText={(e) => this.setState({ mobile_number: e })} keyboardType="number-pad" />

                <Text style={styles.label}>{configApp.getTag('lbl_cpf')}:</Text>
                <TextInput keyboardType="numeric" value={this.state.cpf} style={styles.input} underlineColorAndroid="transparent" onChangeText={(e) => this.setState({ cpf: e })} keyboardType="number-pad" />

                <Text style={styles.label}>{configApp.getTag('lbl_password')}:</Text>
                <TextInput value={this.state.password} secureTextEntry={true} style={styles.input} underlineColorAndroid="transparent" onChangeText={(e) => this.setState({ password: e })} textContentType="password" />

                <Text style={styles.label}>{configApp.getTag('lbl_4digit_password')}:</Text>
                <TextInput placeholder="* * * *" keyboardType="numeric" value={this.state.pincode} secureTextEntry={true} style={styles.input} underlineColorAndroid="transparent" onChangeText={(e) => this.setState({ pincode: e })} textContentType="password" />

                <View style={styles.button}>
                    <Button
                        title={configApp.getTag('btn_create_account')}
                        onPress={() => this.handleSubmit()}
                        color="#0B8B40"
                    />
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0B8B40',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
        margin: 10,
        padding: 5
    },
    label: {
        width: 300,
        color: 'white',
        textAlign: 'left'
    }
});

