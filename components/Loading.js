import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSpinner, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import colors from '../styles/colors';

library.add( faSpinner, faDollarSign );

const Loading = (props) => {
    const size = props.size ?? 20;
    const color = props.color ?? colors.black;
    
    const rotateVal = useRef(new Animated.Value(0)).current;

    const rotateInput = rotateVal.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    useEffect(() => { load() }, []);

    const load = () => {
        Animated.loop(
            Animated.timing(rotateVal, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true
            })
        ).start();
    }

    return(
        <Animated.View style={{
            ...props.style,
            height: size,
            width: size,
            transform: [{rotate: rotateInput}], }}>
            <FontAwesomeIcon
                color={color}
                size={size}
                icon='dollar-sign' />
        </Animated.View>
    );
}

export default Loading;