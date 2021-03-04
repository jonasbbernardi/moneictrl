import { StyleSheet } from 'react-native';
import colors from './colors';

const btnStyle = {
    flex: 1,
    width: 60,
    height: 60,
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#eee'
}

const normalStyles = StyleSheet.create({
    menu: {
        borderRadius: 50,
    },
    bottomFloatButton: {
        position: 'absolute',
        bottom: 10,
        right: 30,
        padding: 1,
    },
    openCloseBtn: { ...btnStyle, backgroundColor: colors.blue},
    receitaBtn: { ...btnStyle, backgroundColor: colors.green},
    despesaBtn: { ...btnStyle, backgroundColor: colors.red, marginTop: 10 },
    touchableLabel: {
        width: 90,
        height: 20,
        bottom: 20,
        position: 'absolute',
        left: -95,
        textAlign: 'center',
        backgroundColor: colors.trueWhite,
        borderRadius: 5,
        zIndex: 2,
        elevation: 1
    }
});

const largeStyles = StyleSheet.create({
    ...normalStyles,
    bottomFloatButton: {
        ...normalStyles.bottomFloatButton,
        right: 15,
    },
    touchableLabel: {
        ...normalStyles.touchableLabel,
        width: 120,
        left: -125,
        bottom: 18,
        height: 25
    }
});

var styles;
if(fontScale == fontScales.NORMAL){
    styles = normalStyles;
} else {
    styles = largeStyles
}

export default styles;