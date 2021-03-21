import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import colors from './colors';
import common from './common';

const fieldFontSize = 18;

const normalStyles = StyleSheet.create({
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
    formRow: {
        flexDirection: 'row',
        width: '100%'
    },
    fieldset: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    label: {
        left: 5,
        top: -5,
        fontSize: 10,
        position: 'absolute',
    },
    descriptionText: {
        flex: 1,
        fontSize: fieldFontSize,
        borderBottomWidth: 1,
        borderColor: colors.lightGray,
        marginVertical: 10,
        paddingLeft: 5,
    },
    valueText: {
        flex: 1,
        fontSize: fieldFontSize,
        borderBottomWidth: 1,
        borderColor: colors.lightGray,
        marginVertical: 10,
        paddingLeft: 5,
    },
    dueDateOut: {
        flex: 1,
        minWidth: 150,
        marginVertical: 10,
    },
    dueDateInput: {
        height: 30,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: colors.lightGray,
        alignItems: 'flex-start',
        paddingLeft: 5,
        marginTop: -1
    },
    dueDateInputText: {
        fontSize: fieldFontSize,
    },
    dueDateTouchBody: {
        height: 27,
    },
    checkboxLabel: {
        flex: 1,
        fontSize: 16,
    },
    checkbox: {
        marginLeft: -5,
    },
    viewButtons: {
        marginTop: 10,
        height: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center',
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

const largeFieldFontSize = 15;
const largeStyles = StyleSheet.create({
    ...normalStyles,
    descriptionText: {
        ...normalStyles.descriptionText,
        fontSize: largeFieldFontSize,
    },
    valueText: {
        ...normalStyles.valueText,
        fontSize: largeFieldFontSize,
    },
    dueDateInputText: {
        ...normalStyles.dueDateInputText,
        fontSize: largeFieldFontSize,
    },
    checkboxLabel: {
        ...normalStyles.checkboxLabel,
        fontSize: 14
    }
})

var styles
if(fontScale == fontScales.NORMAL){
    styles = normalStyles;
} else {
    styles = largeStyles
}

export default styles;