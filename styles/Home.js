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
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shadow,
        zIndex: 1
    }
});

export default styles;