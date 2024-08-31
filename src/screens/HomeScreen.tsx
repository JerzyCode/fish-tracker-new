import React from "react";
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {bgGradientColors, globalStyles} from "../GlobalStyles.tsx";

import logo from '../../assets/app-logo.png';
import LinearGradient from "react-native-linear-gradient";
import {LOGIN_SCREEN_NAV, REGISTER_SCREEN_NAV} from "../../App.tsx";

function HomeScreen({navigation}: any): React.JSX.Element {

    //TODO lock orientation

    const handleLogin = () => {
        navigation.navigate(LOGIN_SCREEN_NAV)
    };

    const handleRegister = () => {
        navigation.navigate(REGISTER_SCREEN_NAV)
    };


    return (
        <SafeAreaView style={globalStyles.container}>
            <LinearGradient colors={bgGradientColors} style={globalStyles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.appName}>Fish Tracker</Text>
                </View>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} resizeMode="contain"/>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </SafeAreaView>
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
        marginBottom: 20,
        alignItems: 'center',
    },
    appName: {
        fontSize: 40,
        color: '#5397fd',
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
        width: 240,
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