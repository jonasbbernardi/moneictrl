import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { applyMask } from '../services/mask';

import styles from '../styles/Footer';
import colors from '../styles/colors';

const Footer = (props) => {
    const items = useSelector(state => state.currentItems);
    const [revenues, setRevenues] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [balance, setBalance] = useState(0);
    const [totalToPay, setTotalToPay] = useState(0);
    const [totalToReceive, setTotalToReceive] = useState(0);

    useEffect(() => {
        let sumRevenues = 0;
        let sumExpenses = 0;
        for (const item of items) {
            if(item.type == gTypes.REVENUE) sumRevenues += Number(item.value);
            if(item.type == gTypes.EXPENSE) sumExpenses -= Number(item.value);
        }
        let r = sumRevenues.toString();
        let e = sumExpenses.toString();
        let b = (sumRevenues + sumExpenses).toString();
        setRevenues(applyMask(r, moneyMask));
        setExpenses(applyMask(e, moneyMask));
        setBalance(applyMask(b, moneyMask));
        setTotalToPay(applyMask(e, moneyMask));
        setTotalToReceive(applyMask(r, moneyMask));
    })

    return (
        <View style={styles.footer}>
            { (!props.type || props.type == gTypes.REVENUE) &&
                <View style={styles.paragraph}>
                    <Text style={styles.text}>
                        Total revenues: 
                    </Text>
                    <Text style={{...styles.counter,
                            color: colors.green
                        }}>{revenues}
                    </Text>
                </View> }
            { (!props.type || props.type == gTypes.EXPENSE) &&
                <View style={styles.paragraph}>
                    <Text style={styles.text}>
                        Total expenses: 
                    </Text>
                    <Text style={{...styles.counter,
                            color: colors.lightRed
                        }}>{expenses}
                    </Text>
                </View> }
            { !props.type &&
                <View style={styles.paragraph}>
                    <Text style={styles.lastText}>
                        Total balance: 
                    </Text>
                    <Text style={{...styles.counter,
                            color: balance < 0 ? colors.red : balance > 0 ? colors.green : colors.white
                        }}>{balance}
                    </Text>
                </View>}
            { !!props.type && props.type == gTypes.EXPENSE && 
                    <View style={styles.paragraph}>
                        <Text style={styles.lastText}>
                            Total to pay:
                        </Text>
                        <Text style={{...styles.counter,
                                color: totalToPay < 0 ? colors.red : totalToPay > 0 ? colors.green : colors.white
                            }}>{totalToPay}
                        </Text>
                    </View>}
            { !!props.type && props.type == gTypes.REVENUE && 
                <View style={styles.paragraph}>
                    <Text style={styles.lastText}>
                        Total to receive:
                    </Text>
                    <Text style={{...styles.counter,
                            color: totalToReceive < 0 ? colors.red : totalToReceive > 0 ? colors.green : colors.white
                        }}>{totalToReceive}
                    </Text>
                </View>
                }
        </View>
    );
}

export default Footer;
