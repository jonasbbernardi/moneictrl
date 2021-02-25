import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

import { filterByType } from '../actions/filterByType';

import AllItemsList from '../components/AllItemsList';
import Footer from '../components/Footer';
import MenuLeft from '../components/MenuLeft';
import MenuTop from '../components/MenuTop';
import MonthSelector from '../components/MonthSelector';
import PlusButton from '../components/PlusButton';
import PlusButtonMenu from '../components/PlusButtonMenu';

import colors from '../styles/colors';
import styles from '../styles/Home';
import { useDispatch } from 'react-redux';
import i18n from '../i18n';

const Home = ({route, navigation}) => {
    const dispatch = useDispatch();
    const defaultTitle = i18n.t('pages.home.default_title');
    const [drawer, setDrawer] = useState();
    const [type, setType] = useState();
    const [title, setTitle] = useState(defaultTitle);

    useEffect(() => {
        if(!!route.params){
            if(route.params.type != type){
                let newType = route.params.type;
                dispatch(filterByType(newType));
                setType(newType);
                let currTitle = i18n.t('pages.home.default_title');
                if(newType == gTypes.EXPENSE) currTitle = i18n.t('pages.home.expenses_title');
                if(newType == gTypes.REVENUE) currTitle = i18n.t('pages.home.revenues_title');
                setTitle(currTitle);
            }
        }
    })

    const onPressExpenseBtn = () => {
        navigation.navigate('AddItem', {type: gTypes.EXPENSE});
    };

    const onPressRevenueBtn = () => {
        navigation.navigate('AddItem', {type: gTypes.REVENUE});
    };

    const onPressPlusBtn = () => {
        navigation.navigate('AddItem', {type});
    }

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
                title={title}
                showSearch={true}
                openDrawer={openDrawer}
            />
            <MonthSelector />
            <AllItemsList type={type}/>
            {!type && <PlusButtonMenu
                onPressRevenueBtn={onPressRevenueBtn}
                onPressExpenseBtn={onPressExpenseBtn}
            />}
            {!!type && <PlusButton
                type={type}
                onPressPlusBtn={onPressPlusBtn}
            />}
            <Footer type={type}/>
            <StatusBar style="light"/>
        </DrawerLayout>
    );
}

export default Home;