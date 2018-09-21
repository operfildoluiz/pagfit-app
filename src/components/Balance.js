import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import format from '../config/helper/format';
import configApp from '../config/app';

const Balance = (props) => (
    <View style={styles.container}>
        <Text style={styles.title}>{configApp.getTag('title_total_balance')}</Text>
        <Text style={styles.text}>R$ {format.currency(props.balance)}</Text>
        <Text style={styles.slug}>Última transação em {props.date}</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        padding: 15,
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

export default Balance;