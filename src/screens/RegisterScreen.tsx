import React, {useState} from "react";
import LinearGradient from "react-native-linear-gradient";
import {blueGradient, darkBlueColor} from "../GlobalStyles.tsx";
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
        <View style={styles.inputsView}>
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

                    <View style={styles.headerView}>
                        <Text style={styles.viewTitle}>{t('register-screen.sign-up')}</Text>
                    </View>

                    {isLoading ? <LoadingFragment/> :
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
    },
    viewTitle: {
        fontSize: 36,
        color: darkBlueColor,
        fontFamily: 'Roboto-Regular',
        fontWeight: 'bold',
        letterSpacing: 1.2,
        textAlign: 'center',
        marginVertical: 50
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
        padding: 25,
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
        marginVertical: 25,
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