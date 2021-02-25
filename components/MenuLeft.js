import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';

import styles from '../styles/MenuLeft';

const MenuLeft = (props) => {
    const navigation = useNavigation();

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
                    <Text style={styles.menuText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    activeOpacity={btnOpacity}
                    onPress={onPressRevenues}
                >
                    <Text style={styles.menuText}>Revenues</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    activeOpacity={btnOpacity}
                    onPress={onPressExpenses}
                >
                    <Text style={styles.menuText}>Expenses</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    activeOpacity={btnOpacity}
                    onPress={onPressSettings}
                >
                    <Text style={styles.menuText}>Settings</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.version}>
                Version: {Constants.nativeAppVersion}
            </Text>
        </View>
    );
}

export default MenuLeft;