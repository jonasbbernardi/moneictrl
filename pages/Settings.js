import React, { useState, useEffect } from 'react';
import { Text, View } from "react-native";
import { useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import i18n from '../i18n';


import LanguageDropdown from '../components/LanguageDropdown';
import MenuLeft from '../components/MenuLeft';
import MenuTop from '../components/MenuTop';

import colors from '../styles/colors';
import styles from '../styles/Settings';

const Settings = () => {
    const locale = useSelector(state => state.locale)

    const initialTitle = i18n.t('pages.settings.title');
    const initialLanguageLabel = i18n.t('pages.settings.language');

    const [drawer, setDrawer] = useState();
    const [title, setTitle] = useState(initialTitle);
    const [languageLabel, setLanguageLabel] = useState(initialLanguageLabel);

    useEffect(() => {
        setTitle(i18n.t('pages.settings.title'));
        setLanguageLabel(i18n.t('pages.settings.language'));
    }, [locale]);

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
                    <Text style={styles.label}>{languageLabel}</Text>
                    <LanguageDropdown style={styles.field} />
                </View>
            </View>
            <StatusBar style="light"/>
        </DrawerLayout>
    )
}

export default Settings;