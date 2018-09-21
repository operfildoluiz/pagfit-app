import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import configApp from '../config/app';
import TransactionItem from './TransactionItem';

const TransactionList = (props) => (
    <ScrollView style={styles.container}>
        <Text style={styles.title}>{configApp.getTag('title_last_transactions')} ({configApp.getTag('title_last')} {props.days} {configApp.getTag('title_days')})</Text>
        {props.transactions.map((item, key) => (
            <TransactionItem item={item} key={key} />
        ))}
    </ScrollView>
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

export default TransactionList;