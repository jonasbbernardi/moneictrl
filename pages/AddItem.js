import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { addRevenue, addExpense} from '../actions/addItem';

import MenuTop from '../components/MenuTop';
import ValueInput from '../components/ValueInput';

import styles from '../styles/AddItem';

const AddItem = ({route, navigation}) => {
    const dispatch = useDispatch();
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const {type} = route.params;

    var valueInput;

    const saveAction = () => {
        let item = {
            description,
            value: Number(value),
            due_date: new Date()
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
                        inputRef={ref => { valueInput = ref }}
                        placeholder={'Value'}
                        mask={moneyMask}
                        onChangeText={text => setValue(text.replace(/\D/, ''))}
                    />
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
        </View>
    );
}

export default AddItem;