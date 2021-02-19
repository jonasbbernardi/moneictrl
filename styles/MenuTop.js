import { StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        backgroundColor: colors.midBlue,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    groupLeft: {
        flex: 2,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuLeftIcon: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        flex: 7,
        fontSize: 14,
        color: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    searchText: {
        flex: 7,
        height: 30,
        fontSize: 14,
        color: colors.white,
        textAlign: 'left',
        borderBottomColor: colors.white,
        borderBottomWidth: 1

    },
    groupRight: {
        flex: 3,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchIcon: {
        flex: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuRightIcon: {
        flex: 2,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default styles;