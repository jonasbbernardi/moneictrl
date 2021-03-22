import React, { useEffect, useState } from 'react';
import { Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { AdMobBanner } from 'expo-ads-admob';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import i18n from '../i18n';

import addItemAction from '../actions/addItem';
import editAction, { editAllAction } from '../actions/editItem';
import {removeItem} from '../actions/removeItem';

import MenuTop from '../components/MenuTop';
import RemoveModal from '../components/RemoveModal';
import SaveModal from '../components/SaveModal';
import ValueInput from '../components/ValueInput';

import styles from '../styles/EditItem';

const EditItem = ({route, navigation}) => {
    // Route params, dispatch and selectors
    const item = route.params;
    const dispatch = useDispatch();
    const moneyMask = useSelector(state => state.locale.moneyMask);
    const currentDate = useSelector(state => state.currentDate);
    const localeDateFormat = useSelector(state => state.locale.dateFormat);
    const month = currentDate.month();
    const year = currentDate.year();

    // Values to show and save item
    const getDueDate = () => {
        let date = moment(item.due_date);
        if(month != date.month()) date.set('month', currentDate.month());
        if(year != date.year()) date.set('year', currentDate.year());
        return moment(date);
    }
    const due_date = getDueDate();
    const [description, setDescription] = useState(item.description);
    const [value, setValue] = useState(item.value);
    const [dueDate, setDueDate] = useState(due_date);
    const [recurring, setRecurring] = useState(item.totalInstallment != 1);
    const [recurringAlways, setRecurringAlways] = useState(item.totalInstallment == 0);
    const [recurringInstallments, setRecurringInstallments] = useState(item.totalInstallment);

    // Input and styles
    const defaultLabelStyleHide = {
        ...styles.label,
        position: 'relative',
        display: 'none'
    }
    const defaultLabelStyleShow = {
        ...styles.label,
        position: 'absolute',
        display: 'flex'
    }
    const initialDescriptionLabel = item.description ? defaultLabelStyleShow : defaultLabelStyleHide;
    const [valueInput, setValueInput] = useState();
    const [recurringInstallmentsInput, setRecurringInstallmentsInput] = useState(1);
    const [saveModalVisible, setSaveModalVisible] = useState(false);
    const [removeModalVisible, setRemoveModalVisible] = useState(false);
    const [descriptionLabelStyle, setDescriptionLabelStyle] = useState(initialDescriptionLabel);
    const [mounted, setMounted] = useState(false);

    // Translations
    const descriptionLabel = i18n.t('pages.edit_item.description');
    const valueLabel = i18n.t('pages.edit_item.value');
    const dueDateLabel = i18n.t('pages.edit_item.due_date');
    const saveLabel = i18n.t('pages.edit_item.save');
    const removeLabel = i18n.t('pages.edit_item.remove');
    const recurringLabel = i18n.t('pages.add_item.recurring');
    const recurringAlwaysLabel = i18n.t('pages.add_item.recurring_always');
    const recurringInstallmentsLabel = i18n.t('pages.add_item.recurring_installments');
    const title =
        item.type === gTypes.EXPENSE ? i18n.t('pages.edit_item.title_expense') :
        item.type === gTypes.REVENUE ? i18n.t('pages.edit_item.title_revenue') :
        i18n.t('pages.edit_item.default_title');

    // Scree effects
    const selectDueDate = (date) => {
        if(date === undefined) return;
        setDueDate(moment(date, localeDateFormat));
        Keyboard.dismiss();
    }
    const onChangeDescriptionText = (text) => {
        setDescription(text);
        setDescriptionLabelStyle(text === '' ?
            defaultLabelStyleHide : defaultLabelStyleShow);
    }
    const focusInstallments = () => {
        if(!recurringAlways && mounted) recurringInstallmentsInput?.focus()
    }
    useEffect(() => {
        setMounted(true)
    }, [])
    useEffect(() => {
        focusInstallments()
    }, [recurringInstallmentsInput])

    // Save button action
    const saveAction = () => {
        if(!!recurring){
            setSaveModalVisible(true);
        } else {
            saveThis();
        }
    }
    const saveAll = (editedItem) => {
        if(!editedItem){
            editedItem = getItemToSave();
            editedItem.id = item.id;
            if(!!recurring && (!!recurringAlways || recurringInstallments > 1)){
                editedItem.installment = !!recurringAlways ? 0 : 1;
                editedItem.totalInstallment = !!recurringAlways ? 0 : recurringInstallments;
            }
        }
        dispatch(editAllAction(editedItem));
        setSaveModalVisible(false);
    }
    const saveThis = async () => {
        let edittedItem = {...item};
        if(!!recurring){
            edittedItem.recurring = getRecurringData();
            let countExcluded = edittedItem.recurring.excluded.reduce((prev = 0, curr) => {
                return prev + curr.length;
            });
            addItem();
            if(!recurringAlways && countExcluded >= recurringInstallments){
                removeAll();
            } else {
                saveAll(edittedItem);
            }
            navigation.goBack();
            navigation.goBack();
            return;
        } else {
            let editedItem = getItemToSave();
            editedItem.id = item.id;
            dispatch(editAction(editedItem));
        }
        setSaveModalVisible(false);
    }
    const addItem = () => {
        let newItem = getItemToSave();
        newItem.due_date = moment(dueDate);
        newItem.installment = 1;
        newItem.totalInstallment = 1;

        dispatch(addItemAction(newItem));
    };
    const getItemToSave = () => {
        let due_date = moment(item.due_date);
        due_date.date(dueDate.date());
        let installment = moment.duration(due_date.diff(dueDate)).asMonths();
        let done = item.done;
        if(!!item.recurring){
            done = item.recurring?.done[year]?.some(m => m == month);
        }
        let itemToSave = {
            done,
            description,
            value: Number(value),
            due_date,
            installment,
            totalInstallment: recurringInstallments ?? 1
        }
        return itemToSave;
    }
    const getRecurringData = () => {
        let recurringData = item.recurring ? {...item.recurring} : {[year]: []};
        if(!recurringData.excluded) recurringData.excluded = {};
        if(!recurringData.excluded[year]) recurringData.excluded[year] = [];
        recurringData.excluded[year].push(month);
        return recurringData;
    }

    // Remove button action
    const removeAction = () => {
        if(!!recurring){
            setRemoveModalVisible(true);
        } else {
            removeThis();
        }
    }
    const removeThis = () => {
        setRemoveModalVisible(false);
    }
    const removeAll = () => {
        setRemoveModalVisible(false);
    }

    // Rendering
    return (
        <View style={styles.container}>
            <View style={styles.statusBar} />
            <MenuTop title={title} showBackButton={true} />
            <View style={styles.form}>
                <View style={styles.formRow}>
                    <View style={styles.fieldset}>
                        <Text style={descriptionLabelStyle}>
                            {descriptionLabel}
                        </Text>
                        <TextInput
                            placeholder={descriptionLabel}
                            style={styles.descriptionText}
                            autoFocus={false}
                            returnKeyType='next'
                            onSubmitEditing={() => { valueInput.focus(); }}
                            onChangeText={onChangeDescriptionText}
                            value={description}
                        />
                    </View>
                </View>
                <View style={styles.formRow}>
                    <View style={styles.fieldset}>
                        <Text style={styles.label}>{valueLabel}</Text>
                        <ValueInput
                            style={styles.valueText}
                            inputRef={setValueInput}
                            placeholder={valueLabel}
                            mask={moneyMask}
                            onChangeText={text => setValue(text.replace(/\D/, ''))}
                            value={value}
                        />
                    </View>
                    <View style={styles.fieldset}>
                        <Text style={styles.label}>{dueDateLabel}</Text>
                        <DatePicker
                            style={styles.dueDateOut}
                            customStyles={{
                                dateInput: styles.dueDateInput,
                                dateTouchBody: styles.dueDateTouchBody,
                                dateText: styles.dueDateInputText,
                                placeholderText: styles.dueDateInputText,
                            }}
                            format={localeDateFormat}
                            date={dueDate}
                            mode="date"
                            onDateChange={selectDueDate} />
                    </View>
                </View>
                <View style={styles.formRow}>
                    <View style={styles.fieldset}>
                        <CheckBox
                            style={styles.checkbox}
                            disabled={false}
                            value={recurring}
                            onValueChange={val => setRecurring(val)} />
                        <Text
                            style={styles.checkboxLabel}
                            onPress={() => setRecurring(!recurring)} >
                            {recurringLabel}
                        </Text>
                    </View>
                    {!!recurring &&
                    <View style={styles.fieldset}>
                        <CheckBox
                            style={styles.checkbox}
                            disabled={false}
                            value={recurringAlways}
                            onValueChange={setRecurringAlways}
                        />
                        <Text
                            style={styles.checkboxLabel}
                            onPress={() => setRecurringAlways(!recurringAlways)} >
                            {recurringAlwaysLabel}
                        </Text>
                    </View>}
                </View>
                <View style={styles.formRow}>
                    {!!recurring && !recurringAlways &&
                    <View style={styles.fieldset}>
                        <Text style={styles.label}>{recurringInstallmentsLabel}</Text>
                        <ValueInput
                            value={recurringInstallments}
                            style={styles.valueText}
                            inputRef={setRecurringInstallmentsInput}
                            placeholder={recurringInstallmentsLabel}
                            mask={'[999990]'}
                            onChangeText={text => setRecurringInstallments(text.replace(/\D/, ''))} />
                    </View>}
                </View>
                <View style={styles.viewButtons}>
                    <SaveModal
                        type={item.type}
                        visible={saveModalVisible}
                        onSave={saveThis}
                        onSaveAll={saveAll}
                        onCancel={() => setSaveModalVisible(false) } />
                    <TouchableOpacity
                        style={styles.saveButton}
                        activeOpacity={btnOpacity}
                        onPress={saveAction}>
                        <Text style={styles.buttonLabel}>{saveLabel}</Text>
                    </TouchableOpacity>
                    <RemoveModal
                        type={item.type}
                        visible={removeModalVisible}
                        onRemove={removeThis}
                        onRemoveAll={removeAll}
                        onCancel={() => setRemoveModalVisible(false) } />
                    <TouchableOpacity
                        style={styles.removeButton}
                        activeOpacity={btnOpacity}
                        onPress={removeAction}>
                        <Text style={styles.buttonLabel}>{removeLabel}</Text>
                    </TouchableOpacity>
                </View>
                <AdMobBanner
                    style={{marginVertical: 10}}
                    bannerSize="banner"
                    adUnitID={google_admob_edit_id}
                    servePersonalizedAds // true or false
                    onDidFailToReceiveAdWithError={e => console.error(e)} />
            </View>
            <StatusBar style="light"/>
        </View>
    );
}

export default EditItem;