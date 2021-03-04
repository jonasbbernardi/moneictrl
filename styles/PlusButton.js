import { StyleSheet } from 'react-native';

import common from './common';

const normalStyles = StyleSheet.create({
    bottomFloatButton: {
        position: 'absolute',
        bottom: 10,
        right: 30,
        padding: 1,
    },
    roundButton: {...common.roundBtnStyle},
});

const largeStyles = StyleSheet.create({
    ...normalStyles,
    bottomFloatButton: {
        ...normalStyles.bottomFloatButton,
        right: 15,
    },
});

var styles;
if(fontScale == fontScales.NORMAL){
    styles = normalStyles;
} else {
    styles = largeStyles
}

export default styles;