import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Menu from '../components/Menu';
import SideMenu from 'react-native-side-menu';

export default class ChargeForm extends Component {

    daysHistory = 3;

    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#0B8B40',
            },
            headerTitle: 'Recarga de conta',
        };
    };

    state = {
        user: null,
        date: '10/09/2018',
        api_token: this.props.navigation.getParam('api_token'),
        transactions: null,
        isOpen: false,
        selectedItem: 'ChargeForm',        
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

    componentDidMount() {
        let vm = this;
        
    }

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

    }

    render() {
        const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
  
        return (
          <SideMenu
            menu={menu}
            isOpen={this.state.isOpen}
            onChange={isOpen => this.updateMenuState(isOpen)}
          >
                <View style={styles.container}>
                    <Text style={{padding: 10, fontSize: 24}}>AQUI UM FORM TOP PRA GERAR BOLETO</Text>
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
        color: 'white',
        textAlign: 'left'
    }
});

