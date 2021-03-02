import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import i18n from '../i18n';

import MenuTop from '../components/MenuTop';

import styles from '../styles/Home';
import { useSelector } from 'react-redux';

const About = () => {
    const locale = useSelector(state => state.locale);
    const initialTitle = i18n.t('pages.about.title');
    const [title, setTitle] = useState(initialTitle);

    useEffect(() => {
        setTitle(i18n.t('pages.about.title'));
    }, [locale]);

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
        </DrawerLayout>
    );
}

export default About;