import React, { useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import MenuTop from '../components/MenuTop';
import PlusButtonMenu from '../components/PlusButtonMenu';
import AllItemsList from '../components/AllItemsList';
import FooterHome from '../components/FooterHome';

import styles from '../styles/Home';

const Home = (props) => {
    const onPressExpenseBtn = () => {
        props.navigation.navigate('AddItem', {type: gTypes.EXPENSE});
    };

    const onPressRevenueBtn = () => {
        props.navigation.navigate('AddItem', {type: gTypes.REVENUE});
    };

    return (
        <View style={styles.container}>
            <View style={styles.statusBar} />
            <MenuTop title='Money Ctrl' showSearch={true} />
            <AllItemsList />
            <PlusButtonMenu
                onPressRevenueBtn={onPressRevenueBtn}
                onPressExpenseBtn={onPressExpenseBtn}
            ></PlusButtonMenu>
            <FooterHome />
            <StatusBar style="light"/>
        </View>
    );
}

export default Home;