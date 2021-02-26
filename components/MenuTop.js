import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearchDollar, faEllipsisV, faBars, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import styles from '../styles/MenuTop';
import colors from '../styles/colors';
import { filterByDescription } from '../actions/filterByDescription';

library.add( faSearchDollar, faEllipsisV, faBars, faChevronLeft );

const MenuTop = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [searchOpened, setSearchOpened] = useState(false);
    const [searchInput, setSearchInput] = useState();
    const [searchText, setSearchText] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        setTitle(props.title);
    })

    const toggleSearch = () => {
        setSearchOpened(!searchOpened);
        if(!searchOpened) searchInput.focus();
        else {
            Keyboard.dismiss();
            searchInput.clear();
            dispatch(filterByDescription(''));
        }
    }

    const onChangeText = (text) => {
        setSearchText(text);
        dispatch(filterByDescription(text));
    }

    const searchByText = () => {
        dispatch(filterByDescription(searchText));
    }

    const onMenu = () => {
        if(typeof props.openDrawer === 'function')
            props.openDrawer();
    }

    const onBack = () => {
        Keyboard.dismiss();
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            { !props.showBackButton &&
            <TouchableOpacity
                style={styles.menuLeftIcon}
                activeOpacity={ btnOpacity }
                onPress={onMenu}>
                <FontAwesomeIcon icon="bars" color="#eee" size={ 20 } />
            </TouchableOpacity>}
            { props.showBackButton &&
            <TouchableOpacity
                style={styles.menuLeftIcon}
                activeOpacity={ btnOpacity }
                onPress={onBack}>
                <FontAwesomeIcon icon="chevron-left" color="#eee" size={ 20 } />
            </TouchableOpacity>}

            {!searchOpened &&
            <Text style={styles.title}>
                {title}
            </Text>}
            <TextInput
                style={{...styles.searchText, display: searchOpened ? 'flex' : 'none'}}
                selectionColor={colors.white}
                ref={input => { setSearchInput(input); }}
                onChangeText={onChangeText}
                onSubmitEditing={searchByText} />

            {props.showSearch &&
            <TouchableOpacity style={styles.searchIcon}
                activeOpacity={ btnOpacity }
                onPress={toggleSearch}>
                <FontAwesomeIcon icon="search-dollar" color="#eee" size={ 20 } />
            </TouchableOpacity>}
        </View>
    );
}

export default MenuTop;