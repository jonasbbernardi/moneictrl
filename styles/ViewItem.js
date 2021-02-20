import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import colors from './colors';

const buttonStyle = {
    flex: 1,
    width: 150,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
}

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
        ...buttonStyle,
        backgroundColor: colors.green,
    },
    removeButton: {
        ...buttonStyle,
        backgroundColor: colors.red,
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