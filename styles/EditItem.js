import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import AddItem from './AddItem';
import colors from './colors';
import common from './common';

const styles = StyleSheet.create({
    ...AddItem,
    removeButton: {
        ...common.buttonStyle,
        backgroundColor: colors.red,
    },
});

export default styles;