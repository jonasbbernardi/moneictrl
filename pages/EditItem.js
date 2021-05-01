import React, { useEffect, useState } from 'react';
import { Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { AdMobBanner } from 'expo-ads-admob';
import moment from 'moment';
import i18n from '../i18n';

import {addItem} from '../actions/addItem';
import {editItem} from '../actions/editItem';
import {removeItem} from '../actions/removeItem';

import MenuTop from '../components/MenuTop';
import RemoveModal from '../components/RemoveModal';
import SaveModal from '../components/SaveModal';
import ValueInput from '../components/ValueInput';

import styles from '../styles/EditItem';
import colors from '../styles/colors';

const EditItem = ({route, navigation}) => {
    // Route params, dispatch and selectors
    const {id, type} = route.params;
    const dispatch = useDispatch();
    const moneyMask = useSelector(state => state.locale.moneyMask);
    const currentDate = useSelector(state => state.currentDate);
    const localeDateFormat = useSelector(state => state.locale.dateFormat);
    const item = useSelector(state => state.items.find(item => item.id == id));
    const currentMonth = currentDate.month();
    const currentYear = currentDate.year();

    // Values to show and save item
    const getDueDate = () => {
        let date = moment(item.due_date);
        if(currentMonth != date.month()){
            date.month(currentMonth);
        }
        return moment(date);
    }
    const due_date = getDueDate();
    const [description, setDescription] = useState(item.description);
    const [value, setValue] = useState(item.value);
    const [dueDate, setDueDate] = useState(due_date);
    const [recurring, setRecurring] = useState(item.recurring?.isRecurring);
    const [recurringAlways, setRecurringAlways] = useState(item.recurring?.always);
    const [recurringInstallments, setRecurringInstallments] = useState(item.recurring?.installments);

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
    const [dueDateInput, setDueDateInput] = useState();
    const [dueDateInputValue, setDueDateInputValue] = useState(moment(due_date).format(localeDateFormat));
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [dueDateDatepicker,setDueDateDatepicker] = useState(moment(due_date).toDate());
    const [recurringInstallmentsInput, setRecurringInstallmentsInput] = useState();
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
        type === gTypes.EXPENSE ? i18n.t('pages.edit_item.title_expense') :
        type === gTypes.REVENUE ? i18n.t('pages.edit_item.title_revenue') :
        i18n.t('pages.edit_item.default_title');

    // Scree effects
    const selectDueDate = (event, selectedDate) => {
        setDatePickerOpen(false);
        Keyboard.dismiss();
        dueDateInput.blur();
        if(selectedDate === undefined) return;
        let date = moment(selectedDate);
        setDueDate(date);
        setDueDateDatepicker(date.toDate())
        setDueDateInputValue(date.format(localeDateFormat))
    }
    const onChangeDescriptionText = (text) => {
        setDescription(text);
        setDescriptionLabelStyle(text === '' ?
            defaultLabelStyleHide : defaultLabelStyleShow);
    }
    const onChangeValueText = (text) => {
        let val = !!text ? text.replace(/\D/, '') : ''
        setValue(val);
    }
    const onChangeInstallmentText = (text) => {
        let val = !!text ? text.replace(/\D/, '') : '';
        setRecurringInstallments(val);
    }
    const focusInstallments = () => {
        if(!recurringAlways && mounted) recurringInstallmentsInput?.focus()
    }
    useEffect(() => {setMounted(true)}, [])
    useEffect(() => {
        focusInstallments()
    }, [recurringInstallmentsInput])

    // Save button action
    const saveAction = () => {
        let recurringChanged = isRecurringChanged();
        if(!!recurring && !recurringChanged){
            setSaveModalVisible(true);
        } else {
            saveAll();
        }
    }
    const saveAll = () => {
        setSaveModalVisible(false);
        let editedItem = {
            id,
            description,
            value: Number(value),
            due_date: dueDate
        };

        editedItem = saveRecurring(editedItem);

        dispatch(editItem(editedItem)).then(() => {
            navigation.goBack();
            navigation.goBack();
        });
    }
    const saveThis = () => {
        setSaveModalVisible(false);
        let done = item.recurring?.done?.some(i => {
            return i.m == currentMonth && i.y == currentYear
        });
        let newItem = {
            type: item.type,
            description,
            value: Number(value),
            due_date: dueDate,
            done: !!done
        };
        dispatch(addItem(newItem));
        removeThis();
    }
    const saveRecurring = (editedItem) => {
        let recurringChanged = isRecurringChanged();
        if(!!recurringChanged){
            if(!!recurring){
                let newRecurring = item.recurring || {};
                newRecurring.isRecurring = true;
                newRecurring.installments = recurringInstallments;
                newRecurring.always = recurringAlways;
                editedItem.recurring = newRecurring;
            } else {
                editedItem.recurring = {};
            }
        }
        return editedItem;
    }

    // Remove button action
    const removeAction = () => {
        if(recurring){
            setRemoveModalVisible(true);
        } else {
            removeAll();
        }
    }
    const removeThis = () => {
        setRemoveModalVisible(false);
        let exclude = item.recurring?.exclude ?? [];
        let editted = {
            id,
            recurring: {
                ...item.recurring,
                exclude: [
                    ...exclude,
                    { m: currentMonth, y: currentYear }
                ]
            }
        }
        let recurring = editted.recurring;
        let fnToDispatch;
        if(!recurring.always && !!recurring.exclude &&
            recurring.exclude.length >= recurring.installments){
            fnToDispatch = removeItem(id);
        } else {
            let installments = recurring.installments - recurring.exclude.length;
            if(installments == 1) delete editted.recurring;
            fnToDispatch = editItem(editted);
        }
        dispatch(fnToDispatch).then(() => {
            navigation.goBack();
            navigation.goBack();
        });
    }
    const removeAll = () => {
        setRemoveModalVisible(false);
        dispatch(removeItem(id)).then(() => {
            navigation.goBack();
            navigation.goBack();
        });
    }

    // Recurring save/remove
    const isRecurringChanged = () => {
        let recurringChanged = recurring != item.recurring?.isRecurring;
        recurringChanged = recurringChanged || recurringAlways != item.recurring?.always;
        recurringChanged = recurringChanged || recurringInstallments != item.recurring?.installments;
        return recurringChanged;
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
                            onChangeText={onChangeValueText}
                            value={value.toString()}
                        />
                    </View>
                    <View style={styles.fieldset}>
                        <Text style={styles.label}>{dueDateLabel}</Text>
                        <TouchableOpacity
                            style={styles.dueDateInputFieldset}
                            activeOpacity={ btnOpacity }
                            onPress={() => setDatePickerOpen(true)}>
                            <ValueInput
                                inputRef={setDueDateInput}
                                value={dueDateInputValue}
                                style={styles.dueDateInput}
                                editable={false}
                                onFocus={Keyboard.dismiss} />
                            <FontAwesomeIcon
                                style={styles.dueDateInputIcon}
                                icon={faCalendarAlt}
                                color={colors.darkGreen}
                                size={ 24 } />
                        </TouchableOpacity>
                        {datePickerOpen && <DateTimePicker
                            style={styles.dueDatePicker}
                            value={dueDateDatepicker}
                            mode="date"
                            onChange={selectDueDate} />}
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
                            onChangeText={onChangeInstallmentText} />
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