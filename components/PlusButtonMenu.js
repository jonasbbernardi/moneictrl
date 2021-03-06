import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View, Animated, Easing, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHandHoldingUsd, faFunnelDollar, faTimes } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import styles from '../styles/PlusButtonMenu';
import colors from '../styles/colors';
import i18n from '../i18n';

library.add( faHandHoldingUsd, faFunnelDollar, faTimes );

/**
 * 
 * @param {{
 *      onPressRevenueBtn: Function,
 *      onPressExpenseBtn: Function,
 *      onPressCloseBtn: Function,
 *      onPressCloseBtn: Function,
 *  }} props    Props must contain callback functions for press event on buttons
 *
 */
const PlusButtonMenu = (props) => {
    const [menuOppened, setMenuOppened] = useState(false);
    const addRevenueLabel = i18n.t('components.plus_button_menu.add_revenue');
    const addExpenseLabel = i18n.t('components.plus_button_menu.add_expense');
    const rotateVal = useRef(new Animated.Value(1)).current;
    const menuOpacityVal = useRef(new Animated.Value(0)).current;
    const animationTime = 150;

    const toggleMenu = () => {
        if(menuOppened) closeMenu(props.onPressCloseBtn);
        else openMenu(props.onPressOpenBtn);
    }

    const closeMenu = cb => {
        toggleAction(0, 1, false, cb);
    };

    const openMenu = cb => {
        toggleAction(1, 0, true, cb);
    }

    const toggleAction = (opacity, rotation, oppened, cb) => {
        if(!!oppened) setMenuOppened(oppened);
        if(cb) cb();
        Animated.timing(menuOpacityVal, {
            toValue: opacity,
            duration: animationTime,
            easing: Easing.linear,
            useNativeDriver: false
        }).start();
        Animated.timing(rotateVal, {
            toValue: rotation,
            duration: animationTime,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
        setTimeout(() => { setMenuOppened(oppened); }, animationTime);
    }

    const rotateInput = rotateVal.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '45deg']
    });

    const labeledButtons = true;
    const touchableShadow = <View style={styles.touchableLabelShadow}></View>
    const revenueLabel = <Text style={styles.touchableLabel}>{addRevenueLabel}</Text>
    const expenseLabel = <Text style={styles.touchableLabel}>{addExpenseLabel}</Text>

    return (
        <View style={styles.bottomFloatButton}>
            <View style={styles.menu}>
                <Animated.View
                    style={{opacity: menuOpacityVal}}>
                    <TouchableOpacity
                        style={{...styles.receitaBtn, display: menuOppened ? 'flex' : 'none'}}
                        activeOpacity={ btnOpacity }
                        onPress={() => closeMenu(props.onPressRevenueBtn)}>
                        {labeledButtons && revenueLabel}
                        {labeledButtons && touchableShadow}
                        <FontAwesomeIcon icon="hand-holding-usd" color={colors.white} size={ 24 } />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{...styles.despesaBtn, display: menuOppened ? 'flex' : 'none'}}
                        activeOpacity={ btnOpacity }
                        onPress={() => closeMenu(props.onPressExpenseBtn)}>
                        {labeledButtons && expenseLabel}
                        {labeledButtons && touchableShadow}
                        <FontAwesomeIcon icon="funnel-dollar" color={colors.white} size={ 24 } />
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={{
                        transform: [{rotate: rotateInput}],
                        marginTop: 10,
                        }}>
                    <TouchableOpacity
                        style={styles.openCloseBtn}
                        activeOpacity={ btnOpacity }
                        onPress={() => toggleMenu()} >
                        <FontAwesomeIcon icon="times" color={colors.white} size={ 24 } />
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    )
}

export default PlusButtonMenu;