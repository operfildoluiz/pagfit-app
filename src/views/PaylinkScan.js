import React, { Component } from 'react';
import {
    TextInput,
    Button,
    View,
    StyleSheet,
} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import Menu from '../components/Menu';
import SideMenu from 'react-native-side-menu';
import configApp from '../config/app';

export default class PaylinkScan extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#0B8B40',
            },
            headerTitle: configApp.getTag('header_make_paylink'),
        };
    };

    state = {
        code: null,
        isOpen: false,
        selectedItem: 'PaylinkScan',
        hasCameraPermission: null,
        lastScannedUrl: null
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

    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };

    _handleBarCodeRead = result => {
        if (result.data !== this.state.lastScannedUrl) {
            this.setState({ lastScannedUrl: result.data, code: result.data }, () => {
                this.handleSubmit();
            });
            
        }
    };

    handleSubmit() {
        
        alert('Proceder para a tela de digitar senha de 4 digitos')

    }

    componentDidMount() {
        this._requestCameraPermission();
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
                    <View style={styles.overlay}>
                        <TextInput
                            placeholder={configApp.getTag('ph_pincode')}
                            style={styles.input}
                            value={this.state.code}
                            onChangeText={(e) => this.setState({ code: e })}
                        />
                        <View style={styles.button}>
                            <Button
                                title={configApp.getTag('btn_pay')}
                                onPress={() => this.handleSubmit()}
                                color="#7460EE"
                            />
                        </View>
                    </View>

                    <View style={styles.qrDiv}>
                        <BarCodeScanner
                            onBarCodeRead={this._handleBarCodeRead}
                            style={styles.qr}
                        />
                    </View>
                </View>
            </SideMenu>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ECF1F2',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column'
    },
    overlay: {
        backgroundColor: 'transparent',
        zIndex: 2,
        position: 'absolute'
    },
    qrDiv: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    qr: {
        borderColor: '#222',
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
        width: '100%',
        height: '100%',
    },
    input: {
        backgroundColor: '#fff',
        height: 50,
        width: 300,
        borderRadius: 5,
        margin: 10,
        padding: 5,
        textAlign: 'center'
    },
    button: {
        width: 300,
        margin: 10
    }
});

