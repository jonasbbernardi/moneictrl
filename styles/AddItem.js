import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import colors from './colors';

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
    saveButton: {
        width: '100%',
        borderWidth: 1,
        height: 40,
        backgroundColor: colors.green,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusBar: {
        backgroundColor: colors.lightBlue,
        height: Constants.statusBarHeight,
        width: '100%'
    },
});

export default styles;