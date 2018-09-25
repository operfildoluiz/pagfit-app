import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import Menu from '../components/Menu';
import SideMenu from 'react-native-side-menu';
import configApp from '../config/app';
import QRCode from 'react-native-qrcode';
import format from '../config/helper/format';

export default class PaylinkShare extends Component {

    social = [
        { name: 'WhatsApp' }, { name: 'Facebook' }, { name: 'Messenger' },
        { name: 'Instagram' }, { name: 'Telegram' }, { name: 'E-mail' }
    ];

    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#0B8B40',
            },
            headerTitle: configApp.getTag('header_get_payment'),
        };
    };

    state = {
        paylink: this.props.navigation.getParam('paylink'),
        isOpen: false,
        selectedItem: 'PaylinkShare',
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

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    _keyExtractor = (item, index) => index;

    _renderItem = ({ item: social }) => (
        <View style={{ width: 100, margin: 5 }}>
            <Button
                title={social.name}
                onPress={() => { }}
                color="#7460EE"
            />
        </View>
    );

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
                        <View style={styles.qrDiv}>
                            <QRCode
                                value={this.state.paylink.code}
                                size={200}
                                style={styles.qr}
                            />
                        </View>
                        <Text style={styles.text}>{this.state.paylink.reference}</Text>
                        <Text style={styles.title}>R$ {format.currency(this.state.paylink.quota)}</Text>
                        <Text style={styles.slug}>{this.state.paylink.description}</Text>

                        <View>
                            <FlatList
                                numColumns={3}
                                data={this.social}
                                keyExtractor={this._keyExtractor}
                                renderItem={this._renderItem}
                                style={styles.flatlist}
                            />
                        </View>

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
    },
    flatlist: {
        flexDirection: 'column',
        flexGrow: 0
    },
    form: {
        backgroundColor: '#FFF',
        padding: 15,
        width: '90%',
        marginTop: '5%',
        marginBottom: '5%',
    },
    qrDiv: {
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    qr: {
        borderColor: '#222',
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#FFF',
    },
    button: {
        width: '100%',
        marginTop: 15,
    },
    label: {
        width: '100%',
        color: '#4A3B4A',
        textAlign: 'left',
        fontSize: 16,
        marginBottom: 10,
    },
    p: {
        marginBottom: 10,
        fontSize: 15,
        color: '#C6BFBF'
    },
    text: {
        color: '#4B4644',
        textAlign: 'center',
        fontSize: 28,
        marginTop: 10,
        marginBottom: 5,
    },
    title: {
        color: '#4A3B4A',
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 5,
    },
    slug: {
        color: '#C6BFBF',
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 15,
    }
});

