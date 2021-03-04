import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import colors from './colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusBar: {
        backgroundColor: colors.lightBlue,
        height: Constants.statusBarHeight,
        width: '100%'
    },
    form: {
        flex: 1,
        margin: 10,
        backgroundColor: colors.trueWhite,
        borderRadius: 5,
    },
    fieldset: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
    },
    label: {
        flex: 1,
        fontSize: 16,
        marginHorizontal: 5,
    },
    field: {
        flex: 2,
    },
    blank: {
        flex: 1,
    },
    adbanner: {
        marginVertical: 10,
        alignSelf: 'center',
    }
});

export default styles;