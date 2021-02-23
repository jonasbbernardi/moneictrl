import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import {applyMask} from '../services/mask';

import colors from '../styles/colors';
import styles from '../styles/ItemsList';

const AllItemsList = (props) => {
    const navigation = useNavigation();
    const currentItems = useSelector(state => state.currentItems);

    const [listData, setListData] = useState([]);

    useEffect(() => {
        let items = currentItems.sort((a, b) => {
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
        return (
            <TouchableOpacity
                style={styles.item}
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
                        {'Due date: ' + moment(item.due_date).format(currentDateFormat)}
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

export default AllItemsList;