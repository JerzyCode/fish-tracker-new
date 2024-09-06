import React, {useState} from "react";
import LinearGradient from "react-native-linear-gradient";
import {blueGradient, darkBlueColor, globalStyles} from "../GlobalStyles.tsx";
import {ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import BackButton from "../components/BackButton.tsx";
import {useTranslation} from "react-i18next";
import {useInfoBar} from "../contexts/InfoBarContext.tsx";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";


function LoadingFragment(): React.JSX.Element {
    return (
        <View style={globalStyles.rlFormInputView}>
            <ActivityIndicator size="large" animating={true}/>
        </View>
    )
}

function LoginScreen({navigation}: any): React.JSX.Element {

    const {t} = useTranslation()
    const {dispatch} = useInfoBar();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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


    const resetInputs = () => {
        setEmail('')
        setPassword('')
    }


    const onRegisterButton = () => {


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
                        <Text style={globalStyles.rlFormInputHeaderText}>{t('login-screen.login')}</Text>
                    </View>

                    {isLoading ? <LoadingFragment/> :
                        <View style={globalStyles.rlFormInputView}>
                            <Text style={globalStyles.rlFormEnterInputText}>{t('login-screen.enter-inputs')}</Text>

                            <TextInput
                                style={[globalStyles.rlFormInput]}
                                placeholder={t('login-screen.email')}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                            <TextInput
                                style={[globalStyles.rlFormInput]}
                                placeholder={t('login-screen.password')}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />

                            <TouchableOpacity style={globalStyles.rlFormInputActionBtn} onPress={onRegisterButton}>
                                <Text
                                    style={globalStyles.rlFormInputActionBtnText}>{t('login-screen.login')}</Text>
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

export default LoginScreen