import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

library.add( faChevronLeft, faChevronRight );

import styles from '../styles/MonthSelector';
import { TouchableOpacity } from 'react-native-gesture-handler';

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const MonthSelector = (props) => {
    const dispatch = useDispatch();
    const [month, setMonth] = useState(new Date());

    const getMonthLabel = (month) => {
        return monthNames[month.getMonth()] + ' ' + month.getFullYear()
    }

    const initialMonthLabel = getMonthLabel(month);
    const [monthLabel, setMonthLabel] = useState(initialMonthLabel);

    const incrementMonth = () => {
        changeMonth(1);
    }

    const decrementMonth = () => {
        changeMonth(-1);
    }

    const changeMonth = (changeValue) => {
        let newMonth = month;
        newMonth.setMonth(month.getMonth() + changeValue);
        let newMonthLabel = getMonthLabel(newMonth);
        setMonthLabel(newMonthLabel);
        setMonth(newMonth);
        dispatch({type: gActions.CHANGE_MONTH, payload: newMonth});
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.previous}
                onPress={decrementMonth}>
                <FontAwesomeIcon icon='chevron-left' style={styles.previousIcon}/>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.label}>
                <Text style={styles.labelText}>
                    {monthLabel}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.next}
                onPress={incrementMonth}>
                <FontAwesomeIcon icon='chevron-right' style={styles.nextIcon}/>
            </TouchableOpacity>
        </View>
    );
}

export default MonthSelector;