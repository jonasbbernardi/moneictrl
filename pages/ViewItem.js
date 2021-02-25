import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { AdMobBanner } from 'expo-ads-admob';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import moment from 'moment';

import {setItemDone, setItemUndone} from '../actions/doneItem';

import MenuTop from '../components/MenuTop';

import { applyMask } from '../services/mask';

import styles from '../styles/ViewItem';
import colors from '../styles/colors';
import i18n from '../i18n';

library.add( faCheck, faTimes );

const ViewItem = ({route, navigation}) => {
    const dispatch = useDispatch();
    const moneyMask = useSelector(state => state.moneyMask);
    const currentDateFormat = useSelector(state => state.currentDateFormat);
    const {id} = route.params;
    var item = useSelector(state => state.items.find(item => item.id == id));
    const [value, setValue] = useState(applyMask(item.value.toString(), moneyMask));
    const [valueColor, setValueColor] = useState(colors.black);
    const [displayDone, isDisplayDone] = useState(item.done);
    const descriptionLabel = i18n.t('pages.view_item.description');
    const valueLabel = i18n.t('pages.view_item.value');
    const dueDateLabel = i18n.t('pages.view_item.due_date');
    const editLabel = i18n.t('pages.view_item.edit');

    useEffect(() => {
        if(item.value != value){
            setValue(applyMask(item.value.toString(), moneyMask));
            setValueColor(colors.black);
            if(item.type == gTypes.EXPENSE) setValueColor(colors.red);
            if(item.type == gTypes.REVENUE) setValueColor(colors.green);
        }
    })

    const doneAction = () => {
        dispatch(setItemDone({id: item.id}));
        isDisplayDone(true);
        // navigation.goBack();
    }
    const undoneAction = () => {
        dispatch(setItemUndone({id: item.id}));
        isDisplayDone(false);
        // navigation.goBack();
    }

    const editAction = () => {
        navigation.navigate('EditItem', {id, type: item.type});
    }

    return (
        <View style={styles.container}>
            <View style={styles.statusBar} />
            <MenuTop title={item.type === gTypes.EXPENSE ? 'View Expense' : 'View Revenue'}
                showBackButton={true}
            />
            <View style={styles.form}>
                <View style={styles.formRow}>
                    <View style={styles.description}>
                        <Text style={styles.label}>{descriptionLabel}</Text>
                        <Text style={styles.descriptionText}>{item.description}</Text>
                    </View>
                </View>
                <View style={styles.formRow}>
                    <View style={styles.value}>
                        <Text style={styles.label}>{valueLabel}</Text>
                        <Text style={{ ...styles.valueText, color: valueColor }}>
                            {value}
                        </Text>
                    </View>
                    <View style={styles.dueDate}>
                        <Text style={styles.label}>{dueDateLabel}</Text>
                        <Text style={styles.dueDateText}>
                            {moment(item.due_date).format(currentDateFormat)}
                        </Text>
                    </View>
                </View>
                <View style={styles.viewButtons}>
                    <TouchableOpacity
                        style={{
                            ...styles.markButton,
                            display: displayDone ? 'none' : 'flex',
                            backgroundColor: colors.green
                        }}
                        activeOpacity={btnOpacity}
                        onPress={doneAction}>
                        <FontAwesomeIcon
                            icon='check'
                            color={colors.white}
                            size={ 24 } />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            ...styles.markButton,
                            display: displayDone ? 'flex' : 'none',
                            backgroundColor: colors.red
                        }}
                        activeOpacity={btnOpacity}
                        onPress={undoneAction}>
                        <FontAwesomeIcon
                            icon='times'
                            color={colors.white}
                            size={ 24 } />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.editButton}
                        activeOpacity={btnOpacity}
                        onPress={editAction}>
                        <Text style={styles.buttonLabel}>{editLabel}</Text>
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