import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { useDispatch } from 'react-redux';
import i18n from '../i18n';
import moment from 'moment';
import 'moment/locale/pt-br';

library.add( faChevronLeft, faChevronRight );

import styles from '../styles/MonthSelector';

const MonthSelector = () => {
    const dispatch = useDispatch();
    const [month, setMonth] = useState(moment());

    const getMonthLabel = (monthDate) => {
        moment.locale(i18n.locale.toLowerCase())
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
        setMonthLabel(getMonthLabel(newMonth));
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