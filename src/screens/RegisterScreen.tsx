import React, {useEffect, useState} from "react";
import LinearGradient from "react-native-linear-gradient";
import {blueGradient, darkBlueColor, globalStyles} from "../GlobalStyles.tsx";
import {ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import BackButton from "../components/BackButton.tsx";
import {useTranslation} from "react-i18next";
import {useInfoBar} from "../contexts/InfoBarContext.tsx";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ApiResponseType, UserRegisterRequest} from "../shared/classes.ts";
import {registerUser} from "../services/UserService.ts";
import {LOGIN_SCREEN_NAV} from "../../App.tsx";

function LoadingFragment(): React.JSX.Element {
    return (
        <View style={globalStyles.rlFormInputView}>
            <ActivityIndicator size="large" animating={true}/>
        </View>
    )
}

function RegisterScreen({navigation}: any): React.JSX.Element {
    const {t} = useTranslation()
    const {dispatch} = useInfoBar();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [validEmail, setIsValidEmail] = useState(true)
    const [validName, setIsValidName] = useState(true)
    const [validPassword, setIsValidPassword] = useState(true)
    const [validConfirmPassword, setIsValidConfirmPassword] = useState(true)

    useEffect(() => {
        if (!validName) {
            setIsValidName(isValidName)
        }
    }, [name]);

    useEffect(() => {
        if (!validEmail) {
            setIsValidEmail(isValidEmail)
        }
    }, [email])

    useEffect(() => {
        if (!validPassword) {
            setIsValidPassword(isValidPassword)
        }
    }, [password])

    useEffect(() => {
        if (!validConfirmPassword) {
            setIsValidConfirmPassword(isValidConfirmPassword)
        }
    }, [confirmPassword])

    const showSuccessInfoBar = (message: string) => {
        dispatch({
            type: 'SHOW_INFO_BAR',
            payload: {
                message: message,
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
        console.debug("isValidName, name=" + name)
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

    const resetInputs = () => {
        setEmail('')
        setName('')
        setPassword('')
        setConfirmPassword('')
    }

    const validateInputs = (): boolean => {
        if (!isValidName()) {
            showErrorInfoBar(t('register-screen.name-error'))
            setIsValidName(false)
            return false;
        }
        setIsValidName(true)

        if (!isValidEmail()) {
            showErrorInfoBar(t('register-screen.email-error'))
            setIsValidEmail(false)
            return false;
        }
        setIsValidEmail(true)


        if (!isValidPassword()) {
            showErrorInfoBar(t('register-screen.password-error'))
            setIsValidPassword(false)
            return false;
        }
        setIsValidPassword(true)


        if (!isValidConfirmPassword()) {
            showErrorInfoBar(t('register-screen.confirm-password-error'))
            setIsValidConfirmPassword(false)
            return false;
        }
        setIsValidConfirmPassword(true)


        return true
    }

    const handleRegisterRequest = (request: UserRegisterRequest) => {
        setIsLoading(true)
        registerUser(request)
            .then(response => {
                if (response.type === ApiResponseType.SUCCESS) {
                    showSuccessInfoBar(t('register-screen.register-success'))
                    resetInputs()
                    navigation.navigate(LOGIN_SCREEN_NAV)
                } else if (response.type === ApiResponseType.USERNAME_TAKEN) {
                    showErrorInfoBar(t('register-screen.register-username-taken'))
                } else {
                    showErrorInfoBar(t('register-screen.register-fail'))
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const onRegisterButton = () => {
        if (!validateInputs()) {
            return
        }

        const registerRequest = new UserRegisterRequest(email, name, password)
        handleRegisterRequest(registerRequest)
    }


    return (
        <KeyboardAwareScrollView style={{flex: 1}}
                                 contentContainerStyle={styles.contentContainer}
                                 keyboardShouldPersistTaps="handled">
            <View style={styles.inner}>
                <BackButton navigation={navigation} color={darkBlueColor}/>
                <LinearGradient
                    colors={blueGradient}
                    style={styles.contentContainer}>

                    <View style={globalStyles.rlFormInputHeaderView}>
                        <Text style={globalStyles.rlFormInputHeaderText}>{t('register-screen.sign-up')}</Text>
                    </View>

                    {isLoading ? <LoadingFragment/> :
                        <View style={globalStyles.rlFormInputView}>
                            <Text style={globalStyles.rlFormEnterInputText}>{t('register-screen.enter-inputs')}</Text>
                            <TextInput
                                style={[globalStyles.rlFormInput, {borderColor: validName ? darkBlueColor : 'red'}]}
                                placeholder={t('register-screen.name')}
                                value={name}
                                onChangeText={setName}
                                autoCapitalize="none"
                            />

                            <TextInput
                                style={[globalStyles.rlFormInput, {borderColor: validEmail ? darkBlueColor : 'red'}]}
                                placeholder={t('register-screen.email')}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                            <TextInput
                                style={[globalStyles.rlFormInput, {borderColor: validPassword ? darkBlueColor : 'red'}]}
                                placeholder={t('register-screen.password')}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />

                            <TextInput
                                style={[globalStyles.rlFormInput, {borderColor: validConfirmPassword ? darkBlueColor : 'red'}]}
                                placeholder={t('register-screen.confirm-password')}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                            />
                            <TouchableOpacity style={globalStyles.rlFormInputActionBtn} onPress={onRegisterButton}>
                                <Text
                                    style={globalStyles.rlFormInputActionBtnText}>{t('register-screen.sign-up')}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </LinearGradient>
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    inner: {
        flex: 1,
        justifyContent: 'space-around',
    },
    contentContainer: {
        flexGrow: 1,
        width: '100%',
    }
})


export default RegisterScreen