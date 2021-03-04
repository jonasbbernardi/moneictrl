import React from "react";
import { Modal, Text, View, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import i18n from "../i18n";
import styles from '../styles/SaveModal';

const getTitle = (type) => {
    if(type == gTypes.EXPENSE) return i18n.t('components.save_modal.expense_title');
    if(type == gTypes.REVENUE) return i18n.t('components.save_modal.revenue_title');
    return i18n.t('components.save_modal.default_title');
}

const SaveModal = (props) => {
    const saveLabel = i18n.t('components.save_modal.save');
    const saveAllLabel = i18n.t('components.save_modal.save_all');
    const cancelLabel = i18n.t('components.save_modal.cancel');
    const title = getTitle(props.type);

    const onSave = () => {
        if(typeof props.onSave === 'function') props.onSave();
    }
    const onSaveAll = () => {
        if(typeof props.onSaveAll === 'function') props.onSaveAll();
    }

    const onCancel = () => {
        if(typeof props.onCancel === 'function') props.onCancel();
    }


    return (
        <Modal
            animationType="fade"
            hardwareAccelerated={false}
            transparent={true}
            visible={props.visible}
            onRequestClose={onCancel}>
            <TouchableOpacity
                style={styles.modal}
                activeOpacity={1}
                onPress={onCancel}>
                <TouchableWithoutFeedback>
                    <View style={styles.container}>
                        <Text style={styles.title}>{title}</Text>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={[styles.button, styles.btn_save]}
                                activeOpacity={btnOpacity}
                                onPress={onSave}
                            >
                                <Text style={styles.textStyle}>{saveLabel}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={[styles.button, styles.btn_save_all]}
                                activeOpacity={btnOpacity}
                                onPress={onSaveAll}
                            >
                                <Text style={styles.textStyle}>{saveAllLabel}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={[styles.button, styles.btn_cancel]}
                                activeOpacity={btnOpacity}
                                onPress={onCancel}
                            >
                                <Text style={styles.textStyle}>{cancelLabel}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
};

export default SaveModal;