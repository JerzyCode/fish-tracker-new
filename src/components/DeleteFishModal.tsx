import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {useTranslation} from "react-i18next";
import {darkGray, white} from "../GlobalStyles.tsx";

interface DeleteFishModalProps {
    isVisible: boolean;
    handleDelete: () => void;
    onClose: () => void;
}


function DeleteFishModal({isVisible, handleDelete, onClose}: DeleteFishModalProps): React.JSX.Element {
    const {t} = useTranslation();


    return <Modal
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
    >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>{t('delete-modal.modal-title')}</Text>
                <Text style={styles.modalText}>{t('delete-modal.modal-text')}</Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={onClose}
                        style={[styles.modalButton, styles.cancelButton]}
                    >
                        <Text style={styles.buttonText}>{t('delete-modal.modal-cancel')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleDelete}
                        style={[styles.modalButton, styles.deleteButton]}
                    >
                        <Text style={styles.buttonText}>{t('delete-modal.modal-confirm')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
}

export default DeleteFishModal

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: 300,
        backgroundColor: darkGray,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#6c757d',
    },
    deleteButton: {
        backgroundColor: '#d9534f',
    },
    buttonText: {
        color: white,
        fontSize: 16,
    },
});