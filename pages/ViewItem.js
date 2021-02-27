import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { AdMobBanner } from 'expo-ads-admob';
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

const getValueColor = (item) => {
    if(item.type == gTypes.EXPENSE) return colors.red;
    if(item.type == gTypes.REVENUE) return colors.green;
    return colors.black;
}
const getTitle = (item) => {
    if(item.type == gTypes.EXPENSE) return i18n.t('pages.view_item.title_expense');;
    if(item.type == gTypes.REVENUE) return i18n.t('pages.view_item.title_revenue');;
    return i18n.t('pages.view_item.default_title');;
}

const ViewItem = ({route, navigation}) => {
    const dispatch = useDispatch();
    const {id} = route.params;

    // Get state items
    const item = useSelector(state => state.items.find(item => item.id == id));
    const currentDate = useSelector(state => state.currentDate);
    const currentDateFormat = useSelector(state => state.currentDateFormat);
    const moneyMask = useSelector(state => state.moneyMask);

    const currentMonth = currentDate.month();
    const currentYear = currentDate.year();

    const getItemIsDone = () => {
        if(!item.recurring?.isRecurring) return !!item.done;
        else return item.recurring?.done?.some(i => {
            return i.m == currentMonth && i.y == currentYear
        });
    }

    const value = applyMask(item.value.toString(), moneyMask);
    const valueColor = getValueColor(item);
    const itemIsDone = getItemIsDone();
    const title = getTitle(item);
    const descriptionLabel = i18n.t('pages.view_item.description');
    const valueLabel = i18n.t('pages.view_item.value');
    const dueDateLabel = i18n.t('pages.view_item.due_date');
    const editLabel = i18n.t('pages.view_item.edit');

    const getDueDate = () => {
        let date = moment(item.due_date);
        if(currentDate.month() != date.month()){
            date.month(currentDate.month());
        }
        return moment(date).format(currentDateFormat)
    }
    const due_date = getDueDate();

    const doneAction = () => {
        dispatch(setItemDone({id: item.id, currentDate}));
        navigation.goBack();
    }
    const undoneAction = () => {
        dispatch(setItemUndone({id: item.id, currentDate}));
        navigation.goBack();
    }

    const editAction = () => {
        navigation.navigate('EditItem', {id, type: item.type});
    }

    return (
        <View style={styles.container}>
            <View style={styles.statusBar} />
            <MenuTop title={title}
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
                            {due_date}
                        </Text>
                    </View>
                </View>
                <View style={styles.viewButtons}>
                    {!itemIsDone &&
                    <TouchableOpacity
                        style={{
                            ...styles.markButton,
                            backgroundColor: colors.green
                        }}
                        activeOpacity={btnOpacity}
                        onPress={doneAction}>
                        <FontAwesomeIcon
                            icon='check'
                            color={colors.white}
                            size={ 24 } />
                    </TouchableOpacity>}
                    {itemIsDone &&
                    <TouchableOpacity
                        style={{
                            ...styles.markButton,
                            backgroundColor: colors.red
                        }}
                        activeOpacity={btnOpacity}
                        onPress={undoneAction}>
                        <FontAwesomeIcon
                            icon='times'
                            color={colors.white}
                            size={ 24 } />
                    </TouchableOpacity>}
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