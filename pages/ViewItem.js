import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';

import MenuTop from '../components/MenuTop';

import styles from '../styles/AddItem';

const ViewItem = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.statusBar} />
            <MenuTop title='View Item' showBackButton={true}/>
            <StatusBar style="light"/>
        </View>
    );
}

export default ViewItem;