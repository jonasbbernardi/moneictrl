import React, { useEffect, useState } from 'react';
import { Modal, FlatList, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Flag from 'react-native-flags';
import { useDispatch } from 'react-redux';
import i18n from '../i18n';

import setLanguage from '../actions/setLanguage';

import colors from '../styles/colors';
import styles from '../styles/LanguageDropdown';

library.add( faChevronDown, faChevronUp );

const LanguageDropdown = (props) => {
    const dispatch = useDispatch();

    const [value, setValue] = useState(i18n.locale);
    const [selectInput, setSelectInput] = useState();
    const [modalVisible, isModalVisible] = useState(false);
    const [modalWidth, setModalWidth] = useState();
    const [modalX, setModalX] = useState();
    const [modalY, setModalY] = useState();

    const initialEnglishOptionLabel = i18n.t('components.language_dropdown.options.english');
    const initialPortugueseOptionLabel = i18n.t('components.language_dropdown.options.portuguese');

    const [selectedFlag, setSelectedFlag] = useState();
    const [selectedLabel, setSelectedLabel] = useState();
    const [englishOptionLabel, setEnglishOptionLabel] = useState(initialEnglishOptionLabel);
    const [portugueseOptionLabel, setPortugueseOptionLabel] = useState(initialPortugueseOptionLabel);

    const items = [
        {value: 'en-US', label: englishOptionLabel, flag: 'US'},
        {value: 'pt-BR', label: portugueseOptionLabel, flag: 'BR'},
    ];

    useEffect( () => {
        if(!!selectInput){
            selectInput.measure((offsetX, offsetY, width, height, pageX, pageY) => {
                setModalWidth(width);
                setModalX(pageX);
                setModalY(pageY + (height/2));
            });
        }
    }), [selectInput];

    useEffect(() => {
        let selected = items.find(i => i.value == value);
        setSelectedLabel(selected.label);
        setSelectedFlag(selected.flag);
    }, [value, englishOptionLabel, portugueseOptionLabel]);

    const refreshLocale = () => {
        setEnglishOptionLabel(i18n.t('components.language_dropdown.options.english'));
        setPortugueseOptionLabel(i18n.t('components.language_dropdown.options.portuguese'));
    }

    const onSelect = (newValue) => {
        modalToggle();
        setValue(newValue);
        dispatch(setLanguage(newValue)).then(refreshLocale);
    }

    const modalToggle = () => {
        isModalVisible(!modalVisible);
    }

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => onSelect(item.value)}
                activeOpacity={btnOpacity}
            >
                <View style={styles.itemContent}>
                    <Flag style={styles.flag}
                        code={item.flag}
                        size={16}
                    />
                    <Text>{item.label}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={[styles.container, props.style]}>
            <View ref={setSelectInput}
                    style={styles.header} >
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={modalToggle}
                    activeOpacity={1} >
                    <View style={styles.headerSelected}>
                        <Flag style={styles.headerSelectedFlag}
                            code={selectedFlag}
                            size={16}
                        />
                        <Text style={styles.headerButtonText}>{selectedLabel}</Text>
                    </View>
                    { !modalVisible &&
                    <FontAwesomeIcon
                        size={14}
                        icon='chevron-down'
                        color={colors.gray}
                        style={styles.headerButtonIcon} />}
                    { !!modalVisible &&
                    <FontAwesomeIcon
                        size={14}
                        icon='chevron-up'
                        color={colors.gray}
                        style={styles.headerButtonIcon} />}
                </TouchableOpacity>
            </View>
            <Modal
                hardwareAccelerated={false}
                transparent={true}
                visible={modalVisible}
                onRequestClose={modalToggle}
            >
                <TouchableOpacity
                    style={styles.modalOut}
                    activeOpacity={1}
                    onPress={modalToggle}>
                    <TouchableWithoutFeedback>
                        <View style={{
                            ...styles.modal, 
                            top: modalY,
                            left: modalX,
                            width: modalWidth,
                        }}>
                            <FlatList
                                style={{flex: 1}}
                                data={items}
                                renderItem={renderItem}
                                keyExtractor={item => item.value}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

export default LanguageDropdown;