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
        padding: 5,
    },
    description: {
        width: '100%',
        fontSize: 18,
        textAlign: 'center',
        borderWidth: 1,
        padding: 10,
    },
    value:{
        flex: 1,
        textAlign: 'center',
        borderWidth: 1,
        margin: 1,
        padding: 10,
        fontWeight: 'bold',
    },
    dueDate:{
        flex: 1,
        textAlign: 'center',
        borderWidth: 1,
        margin: 1,
        padding: 10,
    },
    viewButtons: {
        marginTop: 20,
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
        color: colors.white,
    },
    statusBar: {
        backgroundColor: colors.lightBlue,
        height: Constants.statusBarHeight,
        width: '100%'
    },
});

export default styles;