import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import colors from './colors';

const arrowButtons = {
    flex: 2,
    width: 50,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.white,
}

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
        ...arrowButtons
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
        textTransform: 'capitalize',
    },
    next: {
        ...arrowButtons
    },
    nextIcon: {
        color: colors.white,
        fontSize: 16,
    },
});

export default styles;