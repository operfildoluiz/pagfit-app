import React, { Component } from 'react';
import { AsyncStorage, TextInput, View, Text, StyleSheet, Button } from 'react-native';
import Menu from '../components/Menu';
import SideMenu from 'react-native-side-menu';
import configApp from '../config/app';
import { TextInputMask } from 'react-native-masked-text'
import format from '../config/helper/format';
import OpsService from '../services/OpsService';
import PaylinkService from '../services/PaylinkService';

export default class PaylinkForm extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#0B8B40',
            },
            headerTitle: configApp.getTag('header_create_paylink'),
        };
    };

    state = {
        quota: 0,
        reference: 'teste',
        description: 'Pagamento via PagFit',
        limit: '1',
        isOpen: false,
        selectedItem: 'PaylinkForm',
    };

    handleSubmit() {
        var vm = this;

        let cur = format.cleanCurrency(this.state.quota);

        AsyncStorage.getItem('bearer', (err, result) => {

            PaylinkService.createPaylink({
                quota: cur,
                reference: this.state.reference,
                description: this.state.description,
                limit: this.state.limit,
            }, result).then(res => {
                vm.setState({ quota: 0 });
                vm.props.navigation.navigate('PaylinkShare', { paylink: res.data.data });
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

                        <Text style={styles.label}>{configApp.getTag('lbl_reference')}:</Text>
                        <TextInput 
                            placeholder={configApp.getTag('ph_reference')}
                            value={this.state.reference}
                            style={styles.input}
                            onChangeText={(e) => this.setState({ reference: e })} 
                            />

                        <Text style={styles.label}>{configApp.getTag('lbl_limit')}:</Text>
                        <Text style={styles.helper}>{configApp.getTag('hp_limit')}:</Text>
                        <TextInput 
                            value={this.state.limit}
                            style={styles.input}
                            onChangeText={(e) => this.setState({ limit: e })} 
                            />                            

                        <View style={styles.button}>
                            <Button
                                title={configApp.getTag('btn_create_paylink')}
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

