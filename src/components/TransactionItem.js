import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import format from '../config/helper/format';

const TransactionItem = (props) => (
    <View style={styles.container}>
        <View style={styles.quota}>
            <Text style={{color: props.item.is_payment ? 'red' : 'green'}}>R$ {format.currency(props.item.quota)}</Text>
            <Text style={styles.text}>{format.date(props.item.created_at)}</Text>
        </View>
        <View style={styles.info}>
            <Text style={styles.title}>{props.item.reference}</Text>
            <Text style={styles.text}>{props.item.description}</Text>
        </View>
    </View>
)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        margin: 5,
        padding: 10,
        minHeight: 50,
        flexDirection: 'row',
    },
    title: {
        color: '#4A3B4A',
        textAlign: 'left',
        fontSize: 15
    },    
    text: {
        color: '#C6BFBF',
        textAlign: 'left',
        fontSize: 12,
    },
    info: {
        width: '80%'
    },
    quota: {
        position: 'absolute', 
        right: 0
    }    
});

export default TransactionItem;