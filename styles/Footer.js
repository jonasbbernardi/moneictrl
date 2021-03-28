import { StyleSheet } from 'react-native';
import colors from './colors';

const textStyle = {
    flex: 1,
    fontFamily: 'Roboto',
    marginLeft: 10,
    color: '#fff',
    textAlign: 'left',
}

const normalStyles = StyleSheet.create({
    footer: {
        width: '100%',
        height: 85,
        zIndex: -1,
        backgroundColor: colors.midBlue,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    paragraph: {
        width: '70%',
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
    },
    lastCounter: {}
});

const largeStyles = StyleSheet.create({
    ...normalStyles,
    paragraph: {
        ...normalStyles.paragraph,
        width: '75%',
        marginTop: 0,
    },
    counter: {
        ...normalStyles.counter,
        fontSize: 14
    },
    lastText: {
        ...normalStyles.lastText,
        marginTop: 2,
    },
    lastCounter: {
        ...normalStyles.lastCounter,
        marginTop: 2,
    }
});

var styles;
if(fontScale == fontScales.NORMAL){
    styles = normalStyles;
} else {
    styles = largeStyles
}

export default styles;