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

    const toggleSearch = () => {
        if(!searchOpened) searchInput.focus();
        else {
            Keyboard.dismiss();
            searchInput.clear();
            dispatch(filterByDescription(''));
        }
        setSearchOpened(!searchOpened);
    }

    const onChangeText = (text) => {
        setSearchText(text);
        dispatch(filterByDescription(text));
    }

    const searchByText = () => {
        dispatch(filterByDescription(searchText));
    }

    const onBack = () => {
        Keyboard.dismiss();
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{...styles.menuLeftIcon,
                    display: props.showBackButton ? 'none' : 'flex'
                }}
                activeOpacity={ btnOpacity }>
                <FontAwesomeIcon icon="bars" color="#eee" size={ 20 } />
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.menuLeftIcon,
                    display: props.showBackButton ? 'flex' : 'none'
                }}
                activeOpacity={ btnOpacity }
                onPress={onBack}>
                <FontAwesomeIcon icon="chevron-left" color="#eee" size={ 20 } />
            </TouchableOpacity>

            <Text
                style={{ ...styles.title,
                    display: searchOpened ? 'none' : 'flex',
                }}>
                {props.title}
            </Text>
            <TextInput
                style={{ ...styles.searchText,
                    display: searchOpened ? 'flex' : 'none',
                }}
                selectionColor={colors.white}
                ref={input => { setSearchInput(input); }}
                onChangeText={onChangeText}
                onSubmitEditing={searchByText} />

            <TouchableOpacity style={{...styles.searchIcon,
                    display: props.showSearch ? 'flex' : 'none',
                }}
                activeOpacity={ btnOpacity }
                onPress={toggleSearch}>
                <FontAwesomeIcon icon="search-dollar" color="#eee" size={ 20 } />
            </TouchableOpacity>
        </View>
    );
}

export default MenuTop;