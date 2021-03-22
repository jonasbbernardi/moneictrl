import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import i18n from '../i18n';

import Item from './Item';

import styles from '../styles/ItemsList';

const ItemsList = (props) => {
    const navigation = useNavigation();
    const currentItems = useSelector(state => state.currentItems);
    const moneyMask = useSelector(state => state.locale.moneyMask);
    const localeDateFormat = useSelector(state => state.locale.dateFormat);

    const dateLabel = i18n.t('components.items_list.due_date');
    const lateLabel = i18n.t('components.items_list.late');
    const paidLabel = i18n.t('components.items_list.paid');
    const receivedLabel = i18n.t('components.items_list.received');
    const doneLabel = i18n.t('components.items_list.done');

    const [listData, setListData] = useState([]);

    useEffect(() => {
        setListData(currentItems.items ?? []);
    }, [currentItems]);

    const renderItem = ({index, item}) => {
        const labels = {
            dateLabel,
            lateLabel,
            paidLabel,
            receivedLabel,
            doneLabel
        };
        return <Item
                    item={item}
                    navigation={navigation}
                    labels={labels}
                    moneyMask={moneyMask}
                    localeDateFormat={localeDateFormat}
                />;
    }
    

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