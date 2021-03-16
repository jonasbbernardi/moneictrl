import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {applyMask} from '../services/mask';
import colors from '../styles/colors';
import moment from 'moment';

import styles from '../styles/Item';

const Item = (props) => {
    const today = moment();
    const {item, navigation, labels, moneyMask, localeDateFormat} = props;

    const viewItem = (id) => {
        navigation.navigate('ViewItem', {id});
    }
    const getStatusLabel = (item) => {
        if(!!item.done){
            if(item.type == gTypes.EXPENSE) return labels.paidLabel;
            if(item.type == gTypes.REVENUE) return labels.receivedLabel;
            return labels.doneLabel;
        }
        if(isLate) return labels.lateLabel;
        return '';
    }

    const isLate = today.isAfter(moment(item.due_date), 'days');

    const backgroundColor = !!item.done ? colors.lightGreen : isLate ? colors.lightRed : colors.trueWhite;

    const statusLabel = getStatusLabel(item);

    const getDueDate = () => {
        let due_date = moment(item.due_date);
        return due_date.format(localeDateFormat);
    }
    const due_date = getDueDate();

    return (
        <TouchableOpacity
            style={{...styles.item, backgroundColor }}
            activeOpacity={0.8}
            onPress={() => viewItem(item.id)}
        >
            <View style={styles.firstRow}>
                <Text style={styles.description} numberOfLines={1}>
                    {item.description}
                </Text>

                {item.type == gTypes.EXPENSE && 
                <Text style={{ ...styles.value, color: colors.red }}>
                    -{applyMask(item.value.toString(), moneyMask)}
                </Text>}
                {item.type == gTypes.REVENUE && 
                <Text style={{ ...styles.value, color: colors.green }}>
                    {applyMask(item.value.toString(), moneyMask)}
                </Text>}
            </View>
            <View style={styles.secondRow}>
                <Text style={styles.dueDate}>
                    {labels.dateLabel + due_date}
                </Text>
                <Text style={styles.status}>
                    {statusLabel}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default Item;