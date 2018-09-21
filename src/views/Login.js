import React, { Component } from 'react';
import { View, Button, Text, TextInput, StyleSheet, Image } from 'react-native';
import AuthService from '../services/AuthService';
import { Buffer } from 'buffer';
import configApp from '../config/app';

export default class Login extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        cpf: '00000000001',
        password: '123123'
    };

    handleSubmit() {

        AuthService.login({
            cpf: this.state.cpf,
            password: Buffer.from(this.state.password).toString('base64')
        }).then((responseJson) => {
            if (responseJson.data.status === "success") {
                this.props.navigation.navigate('Dashboard', {
                    api_token: responseJson.data.data.api_token,
                  });
            } else {
                alert(configApp.getTag('fback_invalid_credentials'));
            }
        })
        .catch((error) => {
            console.error(2, error);
        });
    }

    render() {
        return (
            <View style={styles.container}>

                <Image source={require('./../assets/logo.png')} />

                <Text style={styles.label}>{configApp.getTag('lbl_cpf')}:</Text>
                <TextInput value={this.state.cpf} style={styles.input} underlineColorAndroid="transparent" onChangeText={(e) => this.setState({ cpf: e })} keyboardType="number-pad" />

                <Text style={styles.label}>{configApp.getTag('lbl_password')}:</Text>
                <TextInput value={this.state.password} secureTextEntry={true} style={styles.input} underlineColorAndroid="transparent" onChangeText={(e) => this.setState({ password: e })} textContentType="password" />

                <View style={styles.button}>
                    <Button
                        title={configApp.getTag('btn_login')}
                        onPress={() => this.handleSubmit()}
                        color="#F62D51"
                    />
                </View>

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

