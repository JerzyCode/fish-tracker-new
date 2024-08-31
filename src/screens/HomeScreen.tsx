import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {globalStyles} from "../GlobalStyles.tsx";

import logo from '../../assets/app-logo.png';
import LinearGradient from "react-native-linear-gradient";

function HomeScreen(): React.JSX.Element {


    const handleLogin = () => {
        console.log('Login clicked');
    };

    const handleRegister = () => {
        console.log('Register clicked');
    };


    return (
        <LinearGradient
            colors={['#08144b', '#7622c4']}
            style={globalStyles.container}>
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