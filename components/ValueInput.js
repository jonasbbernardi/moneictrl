import React, { useState } from 'react';
import { TextInput } from 'react-native';
import {applyMask, removeMask} from '../services/mask';

const TextInputMask = (props) => {
    const [inputValue, changeText] = useState('');

    var input;

    const onChangeText = (text) => {
        input.clear();
        let textWithoutMask = text;
        if(!!text && text !== inputValue && !!props.mask){
            textWithoutMask = removeMask(text, props.mask);
            text = applyMask(textWithoutMask, props.mask);
        }
        changeText(text);
        if(typeof props.onChangeText === 'function'){
            props.onChangeText(textWithoutMask, text);
        }
    }

    const setRef = (ref) => {
        input = ref;
        if(typeof props.inputRef === 'function')
            return props.inputRef(ref);
        return ref;
    }

    return (<TextInput
        {...props}
        ref={setRef}
        onChangeText={onChangeText}
        value={inputValue}
        autoCompleteType='off'
        autoCorrect={false}
        multiline={false}
        spellCheck={false}
        disableFullscreenUI
        keyboardType='decimal-pad'
    />)
}

export default TextInputMask;