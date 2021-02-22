import React, { useState } from 'react';
import { Keyboard, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { AdMobBanner } from 'expo-ads-admob';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import {removeItem} from '../actions/removeItem';
import {editItem} from '../actions/editItem';

import MenuTop from '../components/MenuTop';
import ValueInput from '../components/ValueInput';

import styles from '../styles/ViewItem';

const ViewItem = ({route, navigation}) => {
    const dispatch = useDispatch();
    const {id} = route.params;
    var item = useSelector(state => state.items.find(item => item.id == id));
    var due_date = moment(item.due_date);

    const [description, setDescription] = useState(item.description);
    const [value, setValue] = useState(item.value);
    const [dueDate, setDueDate] = useState(due_date);
    const [valueInput, setValueInput] = useState();

    const selectDueDate = (date) => {
        if(date === undefined) return;
        setDueDate(moment(date, currentDateFormat));
        Keyboard.dismiss();
    }

    const saveAction = () => {
        let editedItem = {
            id,
            type: item.type,
            description,
            value: Number(value),
            due_date: dueDate
        };
        dispatch(editItem(editedItem));
        navigation.goBack();
    }

    const removeAction = () => {
        navigation.goBack();
        dispatch(removeItem(id));
    }

    return (
        <View style={styles.container}>
            <View style={styles.statusBar} />
            <MenuTop title={item.type === gTypes.EXPENSE ? 'View Expense' : 'View Revenue'}
                showBackButton={true}
            />
            <View style={styles.form}>
                <TextInput
                    placeholder={'Description'}
                    style={styles.descriptionText}
                    autoFocus
                    returnKeyType='next'
                    onSubmitEditing={() => { valueInput.focus(); }}
                    onChangeText={text => setDescription(text)}
                    value={description}
                />
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <ValueInput
                        style={styles.valueText}
                        inputRef={ref => { setValueInput(ref) }}
                        placeholder={'Value'}
                        mask={moneyMask}
                        onChangeText={text => setValue(text.replace(/\D/, ''))}
                        value={value}
                    />
                    <DatePicker
                        customStyles={{ dateInput: styles.dueDateInput }}
                        format={currentDateFormat}
                        date={dueDate}
                        mode="date"
                        onDateChange={selectDueDate} />
                </View>
                <View style={styles.viewButtons}>
                    <TouchableOpacity
                        style={styles.saveButton}
                        activeOpacity={btnOpacity}
                        onPress={saveAction}>
                        <Text style={styles.buttonLabel}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.removeButton}
                        activeOpacity={btnOpacity}
                        onPress={removeAction}>
                        <Text style={styles.buttonLabel}>Remove</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style="light"/>
            <AdMobBanner
                style={{marginVertical: 10}}
                bannerSize="largeBanner"
                adUnitID={google_admob_app_id}
                servePersonalizedAds // true or false
                onDidFailToReceiveAdWithError={e => console.error(e)} />
        </View>
    );
}

export default ViewItem;