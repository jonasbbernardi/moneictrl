import { StyleSheet } from 'react-native';
import colors from './colors';

const textStyle = {
    flex: 1,
    fontFamily: 'Roboto',
    marginLeft: 10,
    color: '#fff',
    textAlign: 'left',
}

const styles = StyleSheet.create({
    footer: {
        width: '100%',
        height: 85,
        zIndex: -1,
        backgroundColor: colors.midBlue,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    paragraph: {
        width: '60%',
        marginTop: 2,
        flexDirection: 'row',
    },
    text: {...textStyle},
    counter: {
        flex: 1,
        fontSize: 16,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    lastText: {
        ...textStyle,
        fontWeight: 'bold',
    }
});

export default styles;