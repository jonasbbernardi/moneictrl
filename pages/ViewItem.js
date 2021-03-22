import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { AdMobBanner } from 'expo-ads-admob';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import moment from 'moment';

import { editItem } from '../actions/editItem';

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
    const item = useSelector(state => state.currentItems.items.find(item => item.id == id));
    const currentDate = useSelector(state => state.currentDate);
    const month = moment(currentDate).month();
    const year = moment(currentDate).year();
    const localeDateFormat = useSelector(state => state.locale.dateFormat);
    const moneyMask = useSelector(state => state.locale.moneyMask);

    const value = applyMask(item.value.toString(), moneyMask);
    const valueColor = getValueColor(item);
    const itemIsDone = !!item.done;
    const title = getTitle(item);
    const descriptionLabel = i18n.t('pages.view_item.description');
    const valueLabel = i18n.t('pages.view_item.value');
    const dueDateLabel = i18n.t('pages.view_item.due_date');
    const editLabel = i18n.t('pages.view_item.edit');

    const getDueDate = () => {
        let date = moment(item.due_date);
        if(month != date.month()) date.set('month', currentDate.month());
        if(year != date.year()) date.set('year', currentDate.year());
        return moment(date).format(localeDateFormat)
    }
    const due_date = getDueDate();

    const doneAction = () => {
        dispatchAction(true);
        navigation.goBack();
    }
    const undoneAction = () => {
        dispatchAction(false);
        navigation.goBack();
    }
    const dispatchAction = async (done) => {
        let editedItem = {...item};
        if(item.totalInstallments == 0){
            if(!editedItem.recurring[year]) editedItem.recurring[year] = [];
            if(done && !editedItem.recurring[year].some(m => m == month)){
                editedItem.recurring[year].push(month);
            } else if(!done) {
                editedItem.recurring[year] = editedItem.recurring[year].filter(m => m != month);
            }
        }
        dispatch(editItem(editedItem));
    }

    const editAction = () => {
        navigation.navigate('EditItem', item);
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
                <AdMobBanner
                    style={{marginVertical: 10}}
                    bannerSize="largeBanner"
                    adUnitID={google_admob_view_id}
                    servePersonalizedAds // true or false
                    onDidFailToReceiveAdWithError={e => console.error(e)} />
            </View>
            <StatusBar style="light"/>
        </View>
    );
}

export default ViewItem;