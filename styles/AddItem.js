import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import colors from './colors';
import common from './common';

const fieldFontSize = 18;

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
    fieldset: {
        marginTop: 5,
        marginHorizontal: 5,
    },
    fieldsetFlex: {
        flex: 1,
        marginTop: 5,
        marginHorizontal: 5,
    },
    label: {
        left: 10,
        top: -5,
        fontSize: 10,
        position: 'absolute',
    },
    descriptionText: {
        width: '90%',
        fontSize: fieldFontSize,
        borderBottomWidth: 1,
        borderColor: colors.lightGray,
        margin: 10,
    },
    valueText: {
        fontSize: fieldFontSize,
        borderBottomWidth: 1,
        borderColor: colors.lightGray,
        margin: 10,
    },
    dueDateOut: {
        flex: 1,
        minWidth: 150,
        margin: 10,
        marginLeft: 0,
    },
    dueDateInput: {
        height: 30,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: colors.lightGray,
    },
    dueDateInputText: {
        fontSize: fieldFontSize,
    },
    dueDateTouchBody: {
        height: 27
    },
    viewButtons: {
        marginTop: 10,
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
        ...common.buttonLabel,
    },
    statusBar: {
        backgroundColor: colors.lightBlue,
        height: Constants.statusBarHeight,
        width: '100%'
    },
});

export default styles;