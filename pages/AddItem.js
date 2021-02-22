import React, { useState } from 'react';
import { Keyboard, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { AdMobBanner } from 'expo-ads-admob';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import { addRevenue, addExpense} from '../actions/addItem';

import MenuTop from '../components/MenuTop';
import ValueInput from '../components/ValueInput';

import styles from '../styles/AddItem';

const AddItem = ({route, navigation}) => {
    const dispatch = useDispatch();
    const today = useSelector(state => state.currentMonth);

    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [dueDate, setDueDate] = useState(today);
    const [valueInput, setValueInput] = useState(null);

    const {type} = route.params;

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

    return (
        <View style={styles.container}>
            <View style={styles.statusBar} />
            <MenuTop title={type === gTypes.EXPENSE ? 'Add Expense' : 'Add Revenue'}
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
                />
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <ValueInput
                        style={styles.valueText}
                        inputRef={ref => { setValueInput(ref) }}
                        placeholder={'Value'}
                        mask={moneyMask}
                        onChangeText={text => setValue(text.replace(/\D/, ''))}
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

export default AddItem;