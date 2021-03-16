import { StyleSheet } from 'react-native';
import colors from './colors';

const normalStyles = StyleSheet.create({
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
        flex: 2,
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

const largeStyles = StyleSheet.create({
    ...normalStyles,
    item: {
        ...normalStyles.item,
        height: 70,
    },
    secondRow: {
        ...normalStyles.secondRow,
        marginTop: 2
    },
    dueDate: {
        ...normalStyles.dueDate,
        flex: 2
    },
})

var styles;
if(fontScale == fontScales.NORMAL){
    styles = normalStyles;
} else {
    styles = largeStyles
}

export default styles;