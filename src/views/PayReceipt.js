import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Menu from '../components/Menu';
import SideMenu from 'react-native-side-menu';
import configApp from '../config/app';
import format from '../config/helper/format';

export default class PayReceipt extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#0B8B40',
            },
            headerTitle: configApp.getTag('header_payment_done'),
        };
    };

    state = {
        pay: this.props.navigation.getParam('pay'),
        isOpen: false,
        selectedItem: 'PayReceipt',
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
                        <Text style={styles.label}>{configApp.getTag('payment_done')}!</Text>
                        <Text style={styles.p}>- {configApp.getTag('lbl_name')}: 
                            <Text style={{ fontWeight: "bold", color: '#4B4644' }}> {this.state.pay.user.data.name}</Text>
                        </Text>
                        <Text style={styles.p}>- {configApp.getTag('lbl_city_state')}: 
                            <Text style={{ fontWeight: "bold", color: '#4B4644' }}> {this.state.pay.user.data.city}/{this.state.pay.user.data.state}</Text>
                        </Text>
                        <Text style={styles.p}>- {configApp.getTag('lbl_cpf')}: 
                            <Text style={{ fontWeight: "bold", color: '#4B4644' }}> {this.state.pay.user.data.cpf}</Text>
                        </Text>                                                                                                
                        <Text style={styles.p}>- {configApp.getTag('lbl_total_quota')}: 
                            <Text style={{ fontWeight: "bold", color: '#4B4644' }}> R$ {format.currency(this.state.pay.quota)}</Text>
                        </Text>
                        <Text style={styles.p}>- {configApp.getTag('lbl_reference')}: 
                            <Text style={{ fontWeight: "bold", color: '#4B4644' }}> {this.state.pay.reference}</Text>
                        </Text>
                        <Text style={styles.p}>- {configApp.getTag('lbl_description')}: 
                            <Text style={{ fontWeight: "bold", color: '#4B4644' }}> {this.state.pay.description}</Text>
                        </Text>                        
                        <Text style={styles.p}>{configApp.getTag('receipt_sent_by_email')}</Text>

                        <View style={styles.button}>
                            <Button
                                title={configApp.getTag('btn_view_pdf')}
                                onPress={() => { alert('PDF Viewer not found') }}
                                color="#F62D51"
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
});

