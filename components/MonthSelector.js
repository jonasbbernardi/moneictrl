import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { useDispatch } from 'react-redux';
import moment from 'moment';

library.add( faChevronLeft, faChevronRight );

import styles from '../styles/MonthSelector';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MonthSelector = (props) => {
    const dispatch = useDispatch();
    const [month, setMonth] = useState(moment());

    const getMonthLabel = (monthDate) => {
        return monthDate.format('MMMM YYYY');
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
        newMonth.add(changeValue, 'months');
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