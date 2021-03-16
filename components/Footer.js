import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { applyMask } from '../services/mask';

import styles from '../styles/Footer';
import colors from '../styles/colors';
import i18n from '../i18n';

const Footer = (props) => {
    const currentItems = useSelector(state => state.currentItems);
    const moneyMask = useSelector(state => state.locale.moneyMask);
    const currentDate = useSelector(state => state.currentDate);
    const [revenues, setRevenues] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [balance, setBalance] = useState(0);
    const [totalToPay, setTotalToPay] = useState(0);
    const [totalToReceive, setTotalToReceive] = useState(0);

    const totalRevenueLabel = i18n.t('components.footer.total.revenue');
    const totalExpenseLabel = i18n.t('components.footer.total.expense');
    const totalBalanceLabel = i18n.t('components.footer.total.balance');
    const totalToPayLabel = i18n.t('components.footer.total.to_pay');
    const totalToReceiveLabel = i18n.t('components.footer.total.to_receive');

    useEffect(() => {
        if(!currentItems.loaded) return;
        let items = currentItems.items;
        let sumRevenues = 0;
        let sumExpenses = 0;
        let sumToPay = 0;
        let sumToReceive = 0;

        for (const item of items) {
            // Check if item is done
            let done = item.done;
            // Sum on right var
            let value = Number(item.value);
            if(item.type == gTypes.REVENUE) {
                if(!done) sumToReceive += value;
                sumRevenues += value
            };
            if(item.type == gTypes.EXPENSE) {
                if(!done) sumToPay += value;
                sumExpenses -= value
            };
        }
        // Fill values on components
        let balance = (sumRevenues + sumExpenses).toString();
        setRevenues(applyMask(sumRevenues.toString(), moneyMask));
        setExpenses(applyMask(sumExpenses.toString(), moneyMask));
        setTotalToReceive(applyMask(sumToReceive.toString(), moneyMask));
        setTotalToPay(applyMask(sumToPay.toString(), moneyMask));
        setBalance(applyMask(balance, moneyMask));
    })

    return (
        <View style={styles.footer}>
            { (!props.type || props.type == gTypes.REVENUE) &&
                <View style={styles.paragraph}>
                    <Text style={styles.text}>
                        {totalRevenueLabel} 
                    </Text>
                    <Text style={{...styles.counter,
                            color: colors.green
                        }}>{revenues}
                    </Text>
                </View> }
            { (!props.type || props.type == gTypes.EXPENSE) &&
                <View style={styles.paragraph}>
                    <Text style={styles.text}>
                        {totalExpenseLabel} 
                    </Text>
                    <Text style={{...styles.counter,
                            color: colors.darkRed
                        }}>{expenses}
                    </Text>
                </View> }
            { !props.type &&
                <View style={styles.paragraph}>
                    <Text style={styles.lastText}>
                        {totalBalanceLabel} 
                    </Text>
                    <Text style={{...styles.counter,
                            color: balance < 0 ? colors.red : balance > 0 ? colors.green : colors.white
                        }}>{balance}
                    </Text>
                </View>}
            { props.type == gTypes.EXPENSE && 
                    <View style={styles.paragraph}>
                        <Text style={styles.lastText}>
                            {totalToPayLabel}
                        </Text>
                        <Text style={{...styles.counter, ...styles.lastCounter,
                                color: totalToPay < 0 ? colors.red : totalToPay > 0 ? colors.green : colors.white
                            }}>{totalToPay}
                        </Text>
                    </View>}
            { props.type == gTypes.REVENUE && 
                <View style={styles.paragraph}>
                    <Text style={styles.lastText}>
                        {totalToReceiveLabel}
                    </Text>
                    <Text style={{...styles.counter, ...styles.lastCounter,
                            color: totalToReceive < 0 ? colors.red : totalToReceive > 0 ? colors.green : colors.white
                        }}>{totalToReceive}
                    </Text>
                </View>
                }
        </View>
    );
}

export default Footer;
