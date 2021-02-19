import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import {applyMask} from '../services/mask';

import colors from '../styles/colors';
import styles from '../styles/ItemsList';

const AllItemsList = (props) => {
    const items = useSelector(state => state.items);
    const [listData, setListData] = useState([]);

    useEffect(() => {
        setListData(items);
    })

    const renderItem = ({index, item}) => {
        return (
            <View style={styles.item}>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={{
                    ...styles.value,
                    color: item.type == gTypes.EXPENSE ? colors.red : colors.green
                    }}>
                    {item.type == gTypes.EXPENSE ? '-' : ''}{applyMask(item.value.toString(), moneyMask)}
                </Text>
            </View>
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