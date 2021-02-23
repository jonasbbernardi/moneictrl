import React, { useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

import AllItemsList from '../components/AllItemsList';
import FooterHome from '../components/FooterHome';
import MenuLeft from '../components/MenuLeft';
import MenuTop from '../components/MenuTop';
import MonthSelector from '../components/MonthSelector';
import PlusButtonMenu from '../components/PlusButtonMenu';

import colors from '../styles/colors';
import styles from '../styles/Home';

const Home = ({navigation}) => {
    const [drawer, setDrawer] = useState();

    const onPressExpenseBtn = () => {
        navigation.navigate('AddItem', {type: gTypes.EXPENSE});
    };

    const onPressRevenueBtn = () => {
        navigation.navigate('AddItem', {type: gTypes.REVENUE});
    };

    const openDrawer = () => drawer.openDrawer();
    const closeDrawer = () => drawer.closeDrawer();

    return (
        <DrawerLayout
            style={styles.container}
            ref={d => setDrawer(d)}
            drawerWidth={250}
            drawerPosition={DrawerLayout.positions.Left}
            drawerType="front"
            drawerBackgroundColor={colors.midBlue}
            renderNavigationView={() => (<MenuLeft closeDrawer={closeDrawer}/>)}
        >
            <View style={styles.statusBar} />
            <MenuTop
                title='Money Ctrl'
                showSearch={true}
                openDrawer={openDrawer}
            />
            <MonthSelector />
            <AllItemsList />
            <PlusButtonMenu
                onPressRevenueBtn={onPressRevenueBtn}
                onPressExpenseBtn={onPressExpenseBtn}
            ></PlusButtonMenu>
            <FooterHome />
            <StatusBar style="light"/>
        </DrawerLayout>
    );
}

export default Home;