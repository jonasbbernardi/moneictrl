// External packages
import React, { useEffect, useState } from 'react';
import { Keyboard, Text, TextInput, View, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { AdMobBanner } from 'expo-ads-admob';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import i18n from '../i18n';
// Project packages
import { addRevenue, addExpense} from '../actions/addItem';
import MenuTop from '../components/MenuTop';
import ValueInput from '../components/ValueInput';
import styles from '../styles/AddItem';

const AddItem = ({route, navigation}) => {
    // Route params, dispatch and selectors
    const {type} = route.params;
    const dispatch = useDispatch();
    const moneyMask = useSelector(state => state.moneyMask);
    const currentDateFormat = useSelector(state => state.currentDateFormat);
    const due_date = useSelector(state => state.currentDate);

    // Values to save item
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [dueDate, setDueDate] = useState(due_date);
    const [recurring, setRecurring] = useState(false);
    const [recurringAlways, setRecurringAlways] = useState(true);
    const [recurringInstallments, setRecurringInstallments] = useState(0);

    // Inputs and styles
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
    const [valueInput, setValueInput] = useState();
    const [recurringInstallmentsInput, setRecurringInstallmentsInput] = useState();
    const [descriptionLabelStyle, setDescriptionLabelStyle] = useState(defaultLabelStyleHide);

    // Translations
    const descriptionLabel = i18n.t('pages.add_item.description');
    const valueLabel = i18n.t('pages.add_item.value');
    const dueDateLabel = i18n.t('pages.add_item.due_date');
    const saveLabel = i18n.t('pages.add_item.save');
    const recurringLabel = i18n.t('pages.add_item.recurring');
    const recurringAlwaysLabel = i18n.t('pages.add_item.recurring_always');
    const recurringInstallmentsLabel = i18n.t('pages.add_item.recurring_installments');
    const title =
        type === gTypes.EXPENSE ? i18n.t('pages.add_item.title_expense') :
        type === gTypes.REVENUE ? i18n.t('pages.add_item.title_revenue') :
        i18n.t('pages.add_item.default_title');

    // Screen effects
    const selectDueDate = (date) => {
        if(date === undefined) return;
        setDueDate(moment(date, currentDateFormat));
        Keyboard.dismiss();
    }
    const selectRecurringAlways = (always) => {
        setRecurringAlways(always);
    }
    const focusInstallments = () => {
        if(!recurringAlways) recurringInstallmentsInput.focus()
    }
    const onChangeDescriptionText = (text) => {
        setDescription(text);
        setDescriptionLabelStyle(text === '' ?
            defaultLabelStyleHide : defaultLabelStyleShow
        );
    }
    useEffect(() => {
        focusInstallments()
    }, [recurringInstallmentsInput])

    // Button action
    const saveAction = () => {
        let item = {
            description,
            value: Number(value),
            due_date: dueDate
        }

        if(!!recurring){
            if(recurringInstallments > 1){
                item.recurring = {
                    isRecurring: true,
                    always: recurringAlways,
                    installments: recurringAlways ? 0 : Number(recurringInstallments)
                }
            }
        }
        let fnToDispatch = null;
        if(type == gTypes.REVENUE) fnToDispatch = addRevenue(item);
        if(type == gTypes.EXPENSE) fnToDispatch = addExpense(item);
        if(!!fnToDispatch) dispatch(fnToDispatch).then(navigation.goBack);
    };

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
                            onChangeText={onChangeDescriptionText} />
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
                            onChangeText={text => setValue(text.replace(/\D/, ''))}/>
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
                            format={currentDateFormat}
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
                            onValueChange={selectRecurringAlways}
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
                            style={styles.valueText}
                            inputRef={setRecurringInstallmentsInput}
                            placeholder={recurringInstallmentsLabel}
                            mask={'[999990]'}
                            onChangeText={text => setRecurringInstallments(text.replace(/\D/, ''))} />
                    </View>}
                </View>
                <View style={styles.viewButtons}>
                    <TouchableOpacity
                        style={styles.saveButton}
                        activeOpacity={btnOpacity}
                        onPress={saveAction}>
                        <Text style={styles.buttonLabel}>{saveLabel}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style="light"/>
            <AdMobBanner
                style={{marginVertical: 10}}
                bannerSize="largeBanner"
                adUnitID={google_admob_add_id}
                servePersonalizedAds // true or false
                onDidFailToReceiveAdWithError={e => console.error(e)} />
        </View>
    );
}

export default AddItem;