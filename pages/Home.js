import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';

import {clearItems} from '../actions/clearItems';

import MenuTop from '../components/MenuTop';
import PlusButtonMenu from '../components/PlusButtonMenu';
import AllItemsList from '../components/AllItemsList';
import FooterHome from '../components/FooterHome';

import styles from '../styles/Home';

const Home = ({navigation}) => {
    const dispatch = useDispatch();

    const onPressExpenseBtn = () => {
        navigation.navigate('AddItem', {type: gTypes.EXPENSE});
        dispatch(clearItems());
    };

    const onPressRevenueBtn = () => {
        navigation.navigate('AddItem', {type: gTypes.REVENUE});
        dispatch(clearItems());
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