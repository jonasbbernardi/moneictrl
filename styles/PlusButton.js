import { StyleSheet } from 'react-native';

import common from './common';

const plusBtnStyles = StyleSheet.create({
    bottomFloatButton: {
        position: 'absolute',
        bottom: 10,
        right: 30,
        padding: 1,
    },
    roundButton: {...common.roundBtnStyle},
});

export default plusBtnStyles;