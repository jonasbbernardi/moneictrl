import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import colors from './colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    statusBar: {
        backgroundColor: colors.midBlue,
        height: Constants.statusBarHeight,
        width: '100%'
    },
    header: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.trueWhite,
        borderRadius: 100,
        backgroundColor: colors.blue,
        margin: 10,
    },
    logo: {
        flex: 1,
        width: 100,
        height: 100,
        marginHorizontal: 15,
        resizeMode: 'contain',
    },
    version: {
        position: 'absolute',
        bottom: 0,
        color: colors.white,
    },
    body: {
        flex: 8,
        width: '100%',
        alignItems: 'center',
        borderTopColor: colors.trueWhite,
        borderTopWidth: 1,
        marginTop: 10
    },
    menuItem: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: colors.lightBlue,
        borderBottomColor: colors.white,
        borderBottomWidth: 1,
        padding: 10,
    },
    menuText: {
        color: colors.white,
        fontSize: 16,
    },
});

export default styles;