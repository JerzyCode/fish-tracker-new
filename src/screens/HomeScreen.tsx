import React from "react";
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {bgGradientColors, blueColor, globalStyles} from "../GlobalStyles.tsx";

import logo from '../../assets/app-logo.png';
import LinearGradient from "react-native-linear-gradient";
import {LOGIN_SCREEN_NAV, REGISTER_SCREEN_NAV} from "../../App.tsx";
import {useTranslation} from "react-i18next";
import LanguageMenu from "../components/LanguageMenu.tsx";
import {MenuProvider} from "react-native-popup-menu";

function HomeScreen({navigation}: any): React.JSX.Element {
    const {t} = useTranslation()

    const handleLogin = () => {
        navigation.navigate(LOGIN_SCREEN_NAV)
    };

    const handleRegister = () => {
        navigation.navigate(REGISTER_SCREEN_NAV)
    };


    return (
        <MenuProvider>
            <LanguageMenu/>
            <SafeAreaView style={globalStyles.container}>
                <LinearGradient colors={bgGradientColors} style={globalStyles.container}>
                    <View style={styles.textContainer}>
                        <Text style={styles.startText}>{t('home-screen.begin')}</Text>
                    </View>
                    <View style={styles.logoContainer}>
                        <Image source={logo} style={styles.logo} resizeMode="contain"/>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleRegister}>
                            <Text style={styles.buttonText}>{t('home-screen.register')}</Text>
                        </TouchableOpacity>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{color: '#FFFFFF', fontSize: 15}}>
                                {t('home-screen.already-have-account')}
                            </Text>
                            <TouchableOpacity onPress={handleLogin}>
                                <Text style={{color: blueColor, fontSize: 15, marginLeft: 5, fontWeight: 'bold'}}>
                                    {t('home-screen.login')}
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </LinearGradient>
            </SafeAreaView>
        </MenuProvider>
    )
}


const styles = StyleSheet.create({
    logoContainer: {
        width: '80%',
        alignItems: 'center',
        marginTop: 20,
    },
    logo: {
        width: '100%',
        height: undefined,
        aspectRatio: 2,
    },
    textContainer: {
        marginBottom: 100,
        alignItems: 'center',
    },
    startText: {
        fontSize: 40,
        color: '#FFFFFF',
        fontFamily: 'Roboto-Regular',
        fontWeight: 'bold',
        letterSpacing: 1.2,
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 30,
        width: '60%',
        alignItems: 'center',
    },
    button: {
        width: 275,
        backgroundColor: '#5397fd',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HomeScreen