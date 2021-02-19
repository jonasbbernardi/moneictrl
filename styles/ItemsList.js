import { StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
    list: {
        flex: 1,
        width: '100%',
    },
    item: {
        width: '100%',
        height: 50,
        borderBottomWidth: 1,
        backgroundColor: colors.white,
        flexDirection: 'row',
        padding: 5
    },
    description: {
        flex: 1,
    },
    value: {
        flex: 1,
        textAlign: 'right',
        marginRight: 5,
    }
});

export default styles;