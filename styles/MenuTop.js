import { StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        backgroundColor: colors.midBlue,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    menuLeftIcon: {
        flex: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        flex: 6,
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    searchText: {
        flex: 6,
        height: 30,
        fontSize: 14,
        color: colors.white,
        textAlign: 'left',
        borderBottomColor: colors.white,
        borderBottomWidth: 1

    },
    searchIcon: {
        flex: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
    }
});

export default styles;