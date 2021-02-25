import React, { useState, useEffect } from 'react';
import { Text, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import DropDownPicker from 'react-native-dropdown-picker';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import { useDispatch } from 'react-redux';
import Flag from 'react-native-flags';
import i18n from '../i18n';

import changeLocale from '../actions/changeLocale';

import MenuLeft from '../components/MenuLeft';
import MenuTop from '../components/MenuTop';

import colors from '../styles/colors';
import styles from '../styles/Settings';

const Settings = () => {
    const dispatch = useDispatch();

    const initialTitle = i18n.t('pages.settings.title');
    const initialLanguage = i18n.t('pages.settings.select_language');

    const [drawer, setDrawer] = useState();
    const [title, setTitle] = useState(initialTitle);
    const [selectLanguageText, setSelectLanguageText] = useState(initialLanguage);

    const items = [
        {label: 'English', value: 'en-US', icon: () => <Flag code="US" size={16}/>},
        {label: 'Portuguese', value: 'pt-BR', icon: () => <Flag code="BR" size={16}/>}
    ];

    const onChangeItem = (item) => {
        dispatch(changeLocale(item.value));
        setTimeout(() => {
            setTitle(i18n.t('pages.settings.title'));
            setSelectLanguageText(i18n.t('pages.settings.select_language'));
        })
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
            <View style={styles.form}>
                <View style={styles.fieldset}>
                    <Text style={styles.label}>{selectLanguageText}</Text>
                    <DropDownPicker
                        containerStyle={styles.field}
                        items={items}
                        itemStyle={{ justifyContent: 'flex-start' }}
                        defaultValue={i18n.locale}
                        onChangeItem={onChangeItem}
                    />
                </View>
            </View>
            <StatusBar style="light"/>
        </DrawerLayout>
    )
}

export default Settings;