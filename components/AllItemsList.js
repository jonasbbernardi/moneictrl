import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import {applyMask} from '../services/mask';

import colors from '../styles/colors';
import styles from '../styles/ItemsList';

const AllItemsList = (props) => {
    const navigation = useNavigation();
    const currentItems = useSelector(state => state.currentItems);

    const [listData, setListData] = useState([]);

    useEffect(() => {
        setListData(currentItems);
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
                <Text style={styles.description}>{item.description}</Text>
                <Text style={{
                    ...styles.value,
                    color: item.type == gTypes.EXPENSE ? colors.red : colors.green
                    }}>
                    {item.type == gTypes.EXPENSE ? '-' : ''}{applyMask(item.value.toString(), moneyMask)}
                </Text>
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