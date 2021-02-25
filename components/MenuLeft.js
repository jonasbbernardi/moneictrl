import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import i18n from '../i18n';

import styles from '../styles/MenuLeft';

const MenuLeft = (props) => {
    const navigation = useNavigation();
    const initialHomeLabel = i18n.t('components.menu_left.home');
    const initialRevenuesLabel = i18n.t('components.menu_left.revenues');
    const initialExpensesLabel = i18n.t('components.menu_left.expenses');
    const initialSettingsLabel = i18n.t('components.menu_left.settings');
    const initialVersionLabel = i18n.t('components.menu_left.version');

    const [homeLabel, setHomeLabel] = useState(initialHomeLabel);
    const [revenuesLabel, setRevenuesLabel] = useState(initialRevenuesLabel);
    const [expensesLabel, setExpensesLabel] = useState(initialExpensesLabel);
    const [settingsLabel, setSettingsLabel] = useState(initialSettingsLabel);
    const [versionLabel, setVersionLabel] = useState(initialVersionLabel);

    useEffect(() => {
        setHomeLabel(i18n.t('components.menu_left.home'));
        setRevenuesLabel(i18n.t('components.menu_left.revenues'));
        setExpensesLabel(i18n.t('components.menu_left.expenses'));
        setSettingsLabel(i18n.t('components.menu_left.settings'));
        setVersionLabel(i18n.t('components.menu_left.version'));
    });

    const onPressHome = () => {
        navigation.navigate('Home', {type: false});
        if(typeof props.closeDrawer === 'function')
            props.closeDrawer();
    }

    const onPressRevenues = () => {
        navigation.navigate('Home', {type: gTypes.REVENUE});
        if(typeof props.closeDrawer === 'function')
            props.closeDrawer();
    }

    const onPressExpenses = () => {
        navigation.navigate('Home', {type: gTypes.EXPENSE});
        if(typeof props.closeDrawer === 'function')
            props.closeDrawer();
    }

    const onPressSettings = () => {
        navigation.navigate('Settings');
        if(typeof props.closeDrawer === 'function')
            props.closeDrawer();
    }

    return (
        <View style={styles.container}>
            <View style={styles.statusBar} />
            <View style={styles.header}>
                <Image
                    style={styles.logo}
                    source={require('../assets/menu-icon.png')}
                />
            </View>
            <View style={styles.body}>
                <TouchableOpacity
                    style={styles.menuItem}
                    activeOpacity={btnOpacity}
                    onPress={onPressHome}
                >
                    <Text style={styles.menuText}>{homeLabel}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    activeOpacity={btnOpacity}
                    onPress={onPressRevenues}
                >
                    <Text style={styles.menuText}>{revenuesLabel}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    activeOpacity={btnOpacity}
                    onPress={onPressExpenses}
                >
                    <Text style={styles.menuText}>{expensesLabel}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    activeOpacity={btnOpacity}
                    onPress={onPressSettings}
                >
                    <Text style={styles.menuText}>{settingsLabel}</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.version}>
                {versionLabel} {Constants.nativeAppVersion}
            </Text>
        </View>
    );
}

export default MenuLeft;