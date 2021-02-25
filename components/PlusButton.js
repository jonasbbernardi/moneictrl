import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHandHoldingUsd, faFunnelDollar, faPlus } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

import colors from '../styles/colors';
import styles from '../styles/PlusButton';

library.add( faHandHoldingUsd, faFunnelDollar, faPlus );

/**
 * 
 * @param {{
 *      onPressPlusBtn: Function,
 *  }} props    Props must contain callback functions for press event on buttons
 *
 */
const PlusButton = (props) => {
    const [type, setType] = useState();
    const [btnColor, setBtnColor] = useState(colors.blue);
    const [btnIcon, setBtnIcon] = useState('plus');

    useEffect(() => {
        if(type != props.type){
            setType(props.type);
            setBtnColor(getColor());
            setBtnIcon(getIcon());
        }
    });

    const getColor = () => {
        if(props.type == gTypes.EXPENSE) return colors.red;
        if(props.type == gTypes.REVENUE) return colors.green;
        return colors.blue;
    }

    const getIcon = () => {
        if(props.type == gTypes.EXPENSE) return 'funnel-dollar';
        if(props.type == gTypes.REVENUE) return 'hand-holding-usd';
        return 'plus';
    }

    return (
        <View style={styles.bottomFloatButton}>
            <View style={styles.menu}>
                <TouchableOpacity
                    style={{
                        ...styles.roundButton,
                        backgroundColor: btnColor
                    }}
                    activeOpacity={ btnOpacity }
                    onPress={props.onPressPlusBtn} >
                    <FontAwesomeIcon
                        icon={btnIcon}
                        color={colors.white}
                        size={ 24 } />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PlusButton;