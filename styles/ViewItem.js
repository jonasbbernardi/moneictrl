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
    formRow:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 10,
    },
    description: {
        width: '100%',
        borderWidth: 1,
        padding: 10,
    },
    descriptionText: {
        fontSize: 18,
        textAlign: 'center',
    },
    value:{
        flex: 1,
        borderWidth: 1,
        marginTop: 10,
        marginRight: 5,
        padding: 10,
    },
    valueText: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    dueDate:{
        flex: 1,
        borderWidth: 1,
        marginTop: 10,
        marginLeft: 5,
        padding: 10,
    },
    dueDateText: {
        fontSize: 18,
        textAlign: 'center',
    },
    label: {
        left: 5,
        top: -7,
        fontSize: 10,
        position: 'absolute',
        paddingHorizontal: 5,
        backgroundColor: colors.trueWhite,
    },
    viewButtons: {
        marginTop: 10,
        height: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    editButton: {
        ...common.buttonStyle,
        backgroundColor: colors.blue,
    },
    markButton: {
        ...common.buttonStyle,
        backgroundColor: colors.green
    },
    buttonLabel: {
        ...common.buttonLabel
    },
    statusBar: {
        backgroundColor: colors.lightBlue,
        height: Constants.statusBarHeight,
        width: '100%'
    },
});

export default styles;