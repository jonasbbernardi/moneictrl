import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import i18n from '../i18n';

import {applyMask} from '../services/mask';

import colors from '../styles/colors';
import styles from '../styles/ItemsList';

const ItemsList = (props) => {
    const navigation = useNavigation();
    const currentItems = useSelector(state => state.currentItems);
    const currentDate = useSelector(state => state.currentDate);
    const moneyMask = useSelector(state => state.moneyMask);
    const currentDateFormat = useSelector(state => state.currentDateFormat);
    const currentMonth = currentDate.month();
    const currentYear = currentDate.year();

    const today = moment();
    const dateLabel = i18n.t('components.items_list.due_date');
    const lateLabel = i18n.t('components.items_list.late');
    const paidLabel = i18n.t('components.items_list.paid');
    const receivedLabel = i18n.t('components.items_list.received');
    const doneLabel = i18n.t('components.items_list.done');

    const [listData, setListData] = useState([]);

    useEffect(() => {
        let items = currentItems;
        items = items.sort((a, b) => {
            let dueDateA = moment(a.due_date);
            let dueDateB = moment(b.due_date);
            return dueDateA.isAfter(dueDateB, 'days');
        });
        setListData(items);
    });

    const isItemLate = (item) => {
        let due_date = item.due_date;
        if(item.recurring?.isRecurring){
            due_date = moment(due_date).set({
                month: currentMonth, year: currentYear
            });
        }
        let late = today.isAfter(moment(due_date), 'days');
        if(late > 0) return colors.lightRed;
    }

    const isItemDone = (item) => {
        if(!item.recurring?.isRecurring) return !!item.done;
        else return item.recurring?.done?.some(i => {
            return i.m == currentMonth && i.y == currentYear
        });
    }

    const viewItem = (id) => {
        navigation.navigate('ViewItem', {id});
    }

    const renderItem = ({index, item}) => {
        const isDone = isItemDone(item);
        const isLate = isItemLate(item);

        const getBackgroundColor = () => {
            if(isDone) return colors.lightGreen;
            if(isLate) return colors.lightRed;
            return colors.trueWhite;
        }
        const backgroundColor = getBackgroundColor();

        const getStatusLabel = () => {
            if(isDone){
                if(item.type == gTypes.EXPENSE) return paidLabel;
                if(item.type == gTypes.REVENUE) return receivedLabel;
                return doneLabel;
            }
            if(isLate) return lateLabel;
            return '';
        }
        const statusLabel = getStatusLabel();

        return (
            <TouchableOpacity
                style={{...styles.item, backgroundColor }}
                activeOpacity={0.8}
                onPress={() => viewItem(item.id)}
            >
                <View style={styles.firstRow}>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={{
                        ...styles.value,
                        color: item.type == gTypes.EXPENSE ? colors.red : colors.green
                        }}>
                        {item.type == gTypes.EXPENSE ? '-' : ''}{applyMask(item.value.toString(), moneyMask)}
                    </Text>
                </View>
                <View style={styles.secondRow}>
                    <Text style={styles.dueDate}>
                        {dateLabel + moment(item.due_date).format(currentDateFormat)}
                    </Text>
                    <Text style={styles.status}>
                        {statusLabel}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{flex: 1, width: '100%'}}>
            <FlatList style={styles.list}
                data={listData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                />
        </View>
    );
}

export default ItemsList;