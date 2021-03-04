import { StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 40,
        width: '100%',
    },
    header: {
        flex: 1,
        width: 200,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray
    },
    headerButton: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
    },
    headerSelected: {
        flexDirection: 'row',
    },
    headerSelectedFlag: {
        marginTop: 5,
        marginHorizontal: 5,
    },
    headerButtonText: {
        fontSize: 16,
        color: colors.black
    },
    headerButtonIcon: {
        marginTop: 5
    },
    modalOut: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    modal: {
        height: 80,
        position: 'absolute',
        borderWidth: 1,
        borderColor: colors.lightGray,
        backgroundColor: colors.trueWhite,
        elevation: 1
    },
    item: {
        height: 40,
        width: '100%',
        alignItems: 'flex-start',
        borderBottomColor: colors.lightGray,
    },
    itemContent: {
        flex: 1,
        height: 40,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    flag: {
        marginHorizontal: 10,
    },
});

export default styles;