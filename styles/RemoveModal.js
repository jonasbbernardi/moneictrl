import { StyleSheet } from 'react-native';

import SaveModal from './SaveModal';
import colors from './colors';
import common from './common';

const styles = StyleSheet.create({
    ...SaveModal,
    btn_remove: {
        backgroundColor: colors.red
    },
    btn_remove_all:{
        flex: 2,
        backgroundColor: colors.red
    },
});

export default styles;