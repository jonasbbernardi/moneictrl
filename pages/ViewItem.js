import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {removeItem} from '../actions/removeItem';
import {saveItem} from '../actions/saveItem';

import MenuTop from '../components/MenuTop';
import ValueInput from '../components/ValueInput';

import styles from '../styles/ViewItem';

const ViewItem = ({route, navigation}) => {
    const dispatch = useDispatch();
    const {id} = route.params;
    var item = useSelector(state => state.items.find(item => item.id == id));

    const [description, setDescription] = useState(item.description);
    const [value, setValue] = useState(item.value);

    var valueInput;

    const type = item.type;

    const saveAction = () => {
        dispatch(saveItem({id, type, description, value}));
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
                        inputRef={ref => { valueInput = ref }}
                        placeholder={'Value'}
                        mask={moneyMask}
                        onChangeText={text => setValue(text.replace(/\D/, ''))}
                        value={value}
                    />
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
        </View>
    );
}

export default ViewItem;