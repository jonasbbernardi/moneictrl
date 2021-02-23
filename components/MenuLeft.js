import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from '../styles/MenuLeft';

const MenuLeft = (props) => {
    const navigation = useNavigation();

    const onPressHome = () => {
        navigation.navigate('Home');
        if(typeof props.closeDrawer === 'function')
            props.closeDrawer();
    }

    const onPressRevenues = () => {
        // navigate to revenues
    }

    const onPressExpenses = () => {
        // navigate to revenues
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
            </View>
        </View>
    );
}

export default MenuLeft;