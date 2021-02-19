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

const plusBtnStyles = StyleSheet.create({
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
    },
    touchableLabelShadow: {
        position: 'absolute',
        width: 91,
        height: 21,
        left: -95,
        bottom: 19,
        backgroundColor: colors.shadow,
        zIndex: 1,
        borderRadius: 5,
    }
});

export default plusBtnStyles;