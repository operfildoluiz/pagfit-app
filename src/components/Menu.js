import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, Text } from 'react-native';
import configApp from '../config/app';

const Menu = (props) => (
    <ScrollView scrollsToTop={false} style={styles.menu}>
        <Text
            onPress={() => props.navigation.navigate('Dashboard')}
            style={styles.item}
        >{configApp.getTag('header_dashboard')}</Text>

        <Text
            onPress={() => props.navigation.navigate('ChargeForm', { token: props.navigation.api_token })}
            style={styles.item}
        >{configApp.getTag('header_charge')}</Text>

        <Text
            onPress={() => props.navigation.navigate('PaylinkForm', { token: props.navigation.api_token })}
            style={styles.item}
        >{configApp.getTag('header_create_paylink')}</Text>
    </ScrollView>
);

export default Menu;

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: window.width,
        height: window.height,
        backgroundColor: '#262626',
        padding: 20,
    },
    name: {
        position: 'absolute',
        left: 70,
        top: 20,
    },
    item: {
        fontSize: 16,
        color: '#798699',
        fontWeight: '300',
        padding: 10,
    },
});

Menu.propTypes = {
    onItemSelected: PropTypes.func.isRequired,
};