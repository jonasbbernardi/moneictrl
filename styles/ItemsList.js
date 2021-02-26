import { StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
    list: {
        flex: 1,
        width: '100%',
        alignContent: 'center',
        textAlign: 'center'
    },
    item: {
        width: '96%',
        height: 60,
        marginTop: '2%',
        marginLeft: '2%',
        marginRight: '2%',
        backgroundColor: colors.trueWhite,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    firstRow: {
        flexDirection: 'row',
    },
    secondRow: {
        flexDirection: 'row',
        marginTop: 5
    },
    description: {
        flex: 1,
        fontSize: 18,
    },
    value: {
        flex: 1,
        textAlign: 'right',
        marginRight: 5,
        fontSize: 16,
    },
    dueDate: {
        flex: 1,
        fontSize: 12,
        color: colors.gray,
    },
    status: {
        flex: 1,
        fontSize: 12,
        color: colors.gray,
        textAlign: 'right',
        marginRight: 5
    },
});

export default styles;