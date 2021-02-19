import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {addItem} from '../actions/addItem';

import MenuTop from '../components/MenuTop';
import ValueInput from '../components/ValueInput';

import styles from '../styles/AddItem';

const AddItem = ({route, navigation}) => {
    const dispatch = useDispatch();
    const [description, setDescription] = useState('');
    const [descriptionFocused, isDescriptionFocused] = useState(true);
    const [value, setValue] = useState('');
    const {type} = route.params;

    var valueInput;

    const saveAction = () => {
        let item = {
            type,
            description,
            value: Number(value)
        }
        dispatch(addItem(item));
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
                <TouchableOpacity
                    style={styles.saveButton}
                    activeOpacity={btnOpacity}
                    onPress={saveAction}>
                    <Text>Save</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="light"/>
        </View>
    );
}

export default AddItem;