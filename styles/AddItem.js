import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import colors from './colors';
import common from './common';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        flex: 1,
        width: '100%',
        padding: 10,
    },
    descriptionText: {
        borderBottomWidth: 1,
        borderColor: colors.white,
        margin: 5,
    },
    valueText: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: colors.white,
        margin: 5,
    },
    viewButtons: {
        marginTop: 20,
        height: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    saveButton: {
        ...common.buttonStyle,
        backgroundColor: colors.green,
    },
    buttonLabel: {
        color: colors.white
    },
    statusBar: {
        backgroundColor: colors.lightBlue,
        height: Constants.statusBarHeight,
        width: '100%'
    },
});

export default styles;