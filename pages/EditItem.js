import React, { useState } from 'react';
import { Keyboard, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { AdMobBanner } from 'expo-ads-admob';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import i18n from '../i18n';

import {removeItem} from '../actions/removeItem';
import {editItem} from '../actions/editItem';

import MenuTop from '../components/MenuTop';
import ValueInput from '../components/ValueInput';

import styles from '../styles/EditItem';

const EditItem = ({route, navigation}) => {
    const dispatch = useDispatch();
    const moneyMask = useSelector(state => state.moneyMask);
    const currentDateFormat = useSelector(state => state.currentDateFormat);
    const {id, type} = route.params;
    const item = useSelector(state => state.items.find(item => item.id == id));
    const due_date = moment(item.due_date);

    const title =
        type === gTypes.EXPENSE ? i18n.t('pages.edit_item.title_expense') :
        type === gTypes.REVENUE ? i18n.t('pages.edit_item.title_revenue') :
        i18n.t('pages.edit_item.default_title');

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

    const [description, setDescription] = useState(item.description);
    const [value, setValue] = useState(item.value);
    const [dueDate, setDueDate] = useState(due_date);
    const [valueInput, setValueInput] = useState();
    const [descriptionLabelStyle, setDescriptionLabelStyle] = useState(item.description ? defaultLabelStyleShow : defaultLabelStyleHide);
    const descriptionLabel = i18n.t('pages.edit_item.description');
    const valueLabel = i18n.t('pages.edit_item.value');
    const dueDateLabel = i18n.t('pages.edit_item.due_date');
    const saveLabel = i18n.t('pages.edit_item.save');
    const removeLabel = i18n.t('pages.edit_item.remove');

    const selectDueDate = (date) => {
        if(date === undefined) return;
        setDueDate(moment(date, currentDateFormat));
        Keyboard.dismiss();
    }

    const saveAction = () => {
        let editedItem = {
            id,
            description,
            value: Number(value),
            due_date: dueDate
        };
        dispatch(editItem(editedItem));
        navigation.goBack();
    }

    const removeAction = () => {
        navigation.goBack();
        navigation.goBack();
        dispatch(removeItem(id));
    }

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
                        value={description}
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
                            value={value}
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
                    <TouchableOpacity
                        style={styles.removeButton}
                        activeOpacity={btnOpacity}
                        onPress={removeAction}>
                        <Text style={styles.buttonLabel}>{removeLabel}</Text>
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

export default EditItem;