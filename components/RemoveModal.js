import React from "react";
import { Modal, Text, View, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import i18n from "../i18n";
import styles from '../styles/RemoveModal';

const getTitle = (type) => {
    if(type == gTypes.EXPENSE) return i18n.t('components.remove_modal.expense_title');
    if(type == gTypes.REVENUE) return i18n.t('components.remove_modal.revenue_title');
    return i18n.t('components.remove_modal.default_title');
}

const RemoveModal = (props) => {
    const removeLabel = i18n.t('components.remove_modal.remove');
    const removeAllLabel = i18n.t('components.remove_modal.remove_all');
    const cancelLabel = i18n.t('components.remove_modal.cancel');
    const title = getTitle(props.type);

    const onRemove = () => {
        if(typeof props.onRemove === 'function') props.onRemove();
    }
    const onRemoveAll = () => {
        if(typeof props.onRemoveAll === 'function') props.onRemoveAll();
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
                                style={[styles.button, styles.btn_remove]}
                                activeOpacity={btnOpacity}
                                onPress={onRemove}
                            >
                                <Text style={styles.textStyle}>{removeLabel}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.btn_remove_all]}
                                activeOpacity={btnOpacity}
                                onPress={onRemoveAll}
                            >
                                <Text style={styles.textStyle}>{removeAllLabel}</Text>
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

export default RemoveModal;