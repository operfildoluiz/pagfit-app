import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BankAccountItem = (props) => (
    <View style={styles.container}>
        {props.item !== undefined ?
        <TouchableOpacity onPress={() => props.onClick(props.item.id) }> 
            <View>
                <Text style={styles.title}>{props.item.bank.bacen_code} - {props.item.bank.name}</Text>
                <Text style={styles.text}>Ag {props.item.agency_number} - CC {props.item.account_number}</Text>
            </View>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={() => props.onClick() }> 
            <View>
                <Text style={styles.title}>(+) Nova conta bancária</Text>
            </View>
        </TouchableOpacity>
        }
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
    }
});

export default BankAccountItem;