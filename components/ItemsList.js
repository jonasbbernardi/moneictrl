import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import i18n from '../i18n';

import {applyMask} from '../services/mask';

import colors from '../styles/colors';
import styles from '../styles/ItemsList';
import { color } from 'react-native-reanimated';

const ItemsList = (props) => {
    const navigation = useNavigation();
    const currentItems = useSelector(state => state.currentItems);
    const moneyMask = useSelector(state => state.moneyMask);
    const currentDateFormat = useSelector(state => state.currentDateFormat);
    const today = moment();
    const dateLabel = i18n.t('components.all_items_list.due_date');
    const lateLabel = i18n.t('components.all_items_list.late');
    const paidLabel = i18n.t('components.all_items_list.paid');
    const receivedLabel = i18n.t('components.all_items_list.received');
    const doneLabel = i18n.t('components.all_items_list.done');

    const [listData, setListData] = useState([]);

    useEffect(() => {
        console.log('setting list');
        let items = currentItems;
        items = items.sort((a, b) => {
            let dueDateA = moment(a.due_date);
            let dueDateB = moment(b.due_date);
            return dueDateA.diff(dueDateB, 'days');
        });
        setListData(items);
    })

    const viewItem = (id) => {
        navigation.navigate('ViewItem', {id});
    }

    const renderItem = ({index, item}) => {
        if(!!item.deleted) return <></>;

        const late = today.diff(moment(item.due_date), 'days');
        console.log(item.description, late);

        const getBackgroundColor = () => {
            if(item.done) return colors.lightGreen;
            if(late > 0) return colors.lightRed;
            return colors.trueWhite;
        }
        const backgroundColor = getBackgroundColor();

        const getStatusLabel = () => {
            if(item.done){
                if(item.type == gTypes.EXPENSE) return paidLabel;
                if(item.type == gTypes.REVENUE) return receivedLabel;
                return doneLabel;
            }
            if(late > 0) return lateLabel;
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