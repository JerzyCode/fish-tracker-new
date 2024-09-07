import React, {useState} from "react";
import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {blueGradient, darkBlueColor, lightGreen, purpleColor} from "../GlobalStyles.tsx";
import LinearGradient from "react-native-linear-gradient";
import {useTranslation} from "react-i18next";
import Icon from "react-native-vector-icons/FontAwesome5";

interface LanguageMenuProps {
    visible: boolean;
    onClose: () => void;
    onSelectLanguage: (language: string) => void;
}

const LanguageModal = ({visible, onClose, onSelectLanguage}: LanguageMenuProps) => {
    const {t, i18n} = useTranslation();

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
                <View>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{t('settings-screen.language')}</Text>
                        <TouchableOpacity
                            style={styles.modalOption}
                            onPress={() => onSelectLanguage('en')}
                        >
                            <Text style={styles.modalOptionText}>English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalOption}
                            onPress={() => onSelectLanguage('pl')}
                        >
                            <Text style={styles.modalOptionText}>Polski</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalCloseButton}
                            onPress={onClose}
                        >
                            <Text style={styles.modalCloseButtonText}>{t('settings-screen.close')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

function SettingsScreen(): React.JSX.Element {
    const {t, i18n} = useTranslation();
    const [isModalVisible, setModalVisible] = useState(false);

    const handleSelectLanguage = (language: string) => {
        i18n.changeLanguage(language);
        setModalVisible(false);
    };

    return (
        <LinearGradient
            colors={blueGradient}
            style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                <Icon name="flag" size={30} color={darkBlueColor}/>
                <Text style={styles.buttonText}>{t('settings-screen.language')}</Text>
            </TouchableOpacity>

            <LanguageModal
                visible={isModalVisible}
                onClose={() => setModalVisible(false)}
                onSelectLanguage={handleSelectLanguage}
            />

        </LinearGradient>
    )
};

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    button: {
        flexDirection: 'row',
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        marginLeft: 10,
        color: darkBlueColor,
        fontFamily: 'Roboto-Regular',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: lightGreen
    },
    modalOption: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        backgroundColor: darkBlueColor,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: lightGreen,
        width: '100%',
        alignItems: 'center',
    },
    modalOptionText: {
        fontSize: 16,
        color: lightGreen
    },
    modalCloseButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: purpleColor,
        borderRadius: 5,
    },
    modalCloseButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
})