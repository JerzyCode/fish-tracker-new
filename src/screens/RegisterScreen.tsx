import React, {useState} from "react";
import LinearGradient from "react-native-linear-gradient";
import {blueGradient, darkBlueColor, globalStyles} from "../GlobalStyles.tsx";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import BackButton from "../components/BackButton.tsx";
import {useTranslation} from "react-i18next";
import {useInfoBar} from "../contexts/InfoBarContext.tsx";


function RegisterScreen({navigation}: any): React.JSX.Element {
    const {t} = useTranslation()
    const {dispatch} = useInfoBar();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const showSuccess = () => {
        dispatch({
            type: 'SHOW_INFO_BAR',
            payload: {
                message: 'Operation was successful!',
                type: 'success',
                visible: true,
                duration: 3000
            }
        });
    };

    const showErrorInfoBar = (message: string) => {
        dispatch({
            type: 'SHOW_INFO_BAR',
            payload: {
                message: message,
                type: 'error',
                visible: true,
                duration: 3000
            }
        });
    }

    const isValidName = (): boolean => {
        return name.length >= 3
    }

    const isValidEmail = (): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (): boolean => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasMinLength = password.length >= 8;
        return hasUpperCase && hasMinLength;
    };

    const isValidConfirmPassword = (): boolean => {
        return confirmPassword === password
    }

    const validateInputs = (): boolean => {
        if (!isValidName()) {
            showErrorInfoBar(t('register-screen.name-error'))
            return false;
        }

        if (!isValidEmail()) {
            showErrorInfoBar(t('register-screen.email-error'))
            return false;
        }

        if (!isValidPassword()) {
            showErrorInfoBar(t('register-screen.password-error'))
            return false;
        }

        if (!isValidConfirmPassword()) {
            showErrorInfoBar(t('register-screen.confirm-password-error'))
            return false;
        }


        return true
    }

    //TODO implement registration :)
    const onRegisterButton = () => {
        if (!validateInputs()) {
            return
        }
    }


    return (
        <View style={globalStyles.container}>
            <BackButton navigation={navigation} color={darkBlueColor}/>
            <LinearGradient
                colors={blueGradient}
                style={styles.contentContainer}>

                <View style={styles.headerView}>
                    <Text style={styles.viewTitle}>{t('register-screen.sign-up')}</Text>
                </View>

                <View style={styles.inputsView}>
                    <Text style={styles.enterInputsText}>{t('register-screen.enter-inputs')}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={t('register-screen.name')}
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder={t('register-screen.email')}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder={t('register-screen.password')}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TextInput
                        style={styles.input}
                        placeholder={t('register-screen.confirm-password')}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />
                    <TouchableOpacity style={styles.registerButton} onPress={onRegisterButton}>
                        <Text style={styles.registerText}>{t('register-screen.sign-up')}</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        width: '100%',
    },
    viewTitle: {
        fontSize: 36,
        color: darkBlueColor,
        fontFamily: 'Roboto-Regular',
        fontWeight: 'bold',
        letterSpacing: 1.2,
        textAlign: 'center',
    },
    enterInputsText: {
        fontSize: 25,
        color: darkBlueColor,
        fontFamily: 'Roboto-Regular',
        fontWeight: 'bold',
        letterSpacing: 1.2,
        textAlign: 'center',
        marginBottom: 25
    },
    headerView: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    inputsView: {
        flex: 7,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        overflow: 'hidden'
    },
    input: {
        height: 55,
        width: 270,
        borderColor: darkBlueColor,
        borderWidth: 2,
        borderRadius: 15,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: 'transparent',
        color: 'black',
        fontSize: 18,
    },
    inputFail: {
        borderColor: 'red',
    },
    registerButton: {
        height: 50,
        width: 270,
        marginTop: 25,
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 15,
    },
    registerText: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'Roboto-Regular',
        fontWeight: 'bold',
    }
})


export default RegisterScreen