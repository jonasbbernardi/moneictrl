import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import colors from './colors';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        backgroundColor: colors.lightBlue,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    previous: {
        flex: 1,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        color: colors.white,
    },
    previousIcon: {
        color: colors.white,
        fontSize: 16,
    },
    label: {
        flex: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    next: {
        flex: 1,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        color: colors.white,
    },
    nextIcon: {
        color: colors.white,
        fontSize: 16,
    },
});

export default styles;