import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { AdMobBanner } from 'expo-ads-admob';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import moment from 'moment';

import MenuTop from '../components/MenuTop';

import { applyMask } from '../services/mask';

import styles from '../styles/ViewItem';
import colors from '../styles/colors';

library.add( faCheck );

const ViewItem = ({route, navigation}) => {
    const moneyMask = useSelector(state => state.moneyMask);
    const currentDateFormat = useSelector(state => state.currentDateFormat);
    const {id} = route.params;
    var item = useSelector(state => state.items.find(item => item.id == id));
    const [value, setValue] = useState(applyMask(item.value.toString(), moneyMask));
    const [valueColor, setValueColor] = useState(colors.black);

    useEffect(() => {
        if(item.value != value){
            setValue(applyMask(item.value.toString(), moneyMask));
            setValueColor(colors.black);
            if(item.type == gTypes.EXPENSE) setValueColor(colors.red);
            if(item.type == gTypes.REVENUE) setValueColor(colors.green);
        }
    })

    const markAction = () => {
        // TODO: Mark as paid or received
    }

    const editAction = () => {
        navigation.navigate('EditItem', {id});
    }

    return (
        <View style={styles.container}>
            <View style={styles.statusBar} />
            <MenuTop title={item.type === gTypes.EXPENSE ? 'View Expense' : 'View Revenue'}
                showBackButton={true}
            />
            <View style={styles.form}>
                <View style={styles.formRow}>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
                <View style={styles.formRow}>
                    <Text style={{
                        ...styles.value,
                        color: valueColor
                    }}>
                        {value}
                    </Text>
                    <Text style={styles.dueDate}>
                        {moment(item.due_date).format(currentDateFormat)}
                    </Text>
                </View>
                <View style={styles.viewButtons}>
                    <TouchableOpacity
                        style={styles.markButton}
                        activeOpacity={btnOpacity}
                        onPress={markAction}>
                        <FontAwesomeIcon
                            icon='check'
                            color={colors.white}
                            size={ 24 } />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.editButton}
                        activeOpacity={btnOpacity}
                        onPress={editAction}>
                        <Text style={styles.buttonLabel}>Edit</Text>
                    </TouchableOpacity>
                </View>
                </View>
            <StatusBar style="light"/>
            <AdMobBanner
                style={{marginVertical: 10}}
                bannerSize="largeBanner"
                adUnitID={google_admob_edit_id}
                servePersonalizedAds // true or false
                onDidFailToReceiveAdWithError={e => console.error(e)} />
        </View>
    );
}

export default ViewItem;