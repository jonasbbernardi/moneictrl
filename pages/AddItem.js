import React, { useState } from 'react';
import { Keyboard, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { AdMobBanner } from 'expo-ads-admob';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import i18n from '../i18n';

import { addRevenue, addExpense} from '../actions/addItem';

import MenuTop from '../components/MenuTop';
import ValueInput from '../components/ValueInput';

import styles from '../styles/AddItem';

const AddItem = ({route, navigation}) => {
    const dispatch = useDispatch();
    const moneyMask = useSelector(state => state.moneyMask);
    const currentDateFormat = useSelector(state => state.currentDateFormat);
    const {type} = route.params;
    const due_date = useSelector(state => state.currentMonth);

    const title =
        type === gTypes.EXPENSE ? i18n.t('pages.add_item.title_expense') :
        type === gTypes.REVENUE ? i18n.t('pages.add_item.title_revenue') :
        i18n.t('pages.add_item.default_title');

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

    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [dueDate, setDueDate] = useState(due_date);
    const [valueInput, setValueInput] = useState();
    const [descriptionLabelStyle, setDescriptionLabelStyle] = useState(defaultLabelStyleHide);
    const descriptionLabel = i18n.t('pages.add_item.description');
    const valueLabel = i18n.t('pages.add_item.value');
    const dueDateLabel = i18n.t('pages.add_item.due_date');
    const saveLabel = i18n.t('pages.add_item.save');

    const selectDueDate = (date) => {
        if(date === undefined) return;
        setDueDate(moment(date, currentDateFormat));
        Keyboard.dismiss();
    }

    const saveAction = () => {
        let item = {
            description,
            value: Number(value),
            due_date: dueDate
        }
        if(type == gTypes.REVENUE) dispatch(addRevenue(item));
        if(type == gTypes.EXPENSE) dispatch(addExpense(item));
        navigation.goBack();
    };

    const onChangeDescriptionText = (text) => {
        setDescription(text);
        setDescriptionLabelStyle(text === '' ?
            defaultLabelStyleHide : defaultLabelStyleShow);
    }

    return (
        <View style={styles.container}>
            <View style={styles.statusBar} />
            <MenuTop title={title}
                showBackButton={true}
            />
            <View style={styles.form}>
                <View style={styles.fieldset}>
                    <Text style={descriptionLabelStyle}>
                        {descriptionLabel}
                    </Text>
                    <TextInput
                        placeholder={descriptionLabel}
                        style={styles.descriptionText}
                        autoFocus
                        returnKeyType='next'
                        onSubmitEditing={() => { valueInput.focus(); }}
                        onChangeText={onChangeDescriptionText}
                    />
                </View>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={styles.fieldsetFlex}>
                        <Text style={styles.label}>{valueLabel}</Text>
                        <ValueInput
                            style={styles.valueText}
                            inputRef={ref => { setValueInput(ref) }}
                            placeholder={valueLabel}
                            mask={moneyMask}
                            onChangeText={text => setValue(text.replace(/\D/, ''))}
                        />
                    </View>
                    <View style={styles.fieldsetFlex}>
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