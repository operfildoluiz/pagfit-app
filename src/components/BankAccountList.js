import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import configApp from '../config/app';
import BackAccountItem from './BankAccountItem';

const BankAccountList = (props) => (
    <View style={styles.container}>
        {props.bank_accounts.map((item, key) => (
            <BackAccountItem item={item} key={key} onClick={props.onClick} />
        ))}
        <BackAccountItem onClick={() => props.onClick(null)} />
    </View>
)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        padding: 15,
        marginTop: '5%',
    },
    title: {
        color: '#4A3B4A',
        textAlign: 'left',
        fontSize: 16
    },    
    text: {
        color: '#4B4644',
        textAlign: 'left',
        fontSize: 28,
    },
    slug: {
        color: '#C6BFBF',
        textAlign: 'left',
        fontSize: 15
    }    
});

export default BankAccountList;