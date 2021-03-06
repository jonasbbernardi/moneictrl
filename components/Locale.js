import React from 'react';
import { useSelector } from 'react-redux';
import i18n from '../i18n';

const Locale = () => {
    i18n.locale = useSelector(state => state.locale.lang)
    return (<></>)
}

export default Locale;