import React from "react";
import LinearGradient from "react-native-linear-gradient";
import {bgGradientColors, globalStyles} from "../GlobalStyles.tsx";
import {Text} from "react-native";


function LoginScreen(): React.JSX.Element {

    return (
        <LinearGradient
            colors={bgGradientColors}
            style={globalStyles.container}>
            <Text>
                LOGIN SCREEN
            </Text>


        </LinearGradient>

    )
}

export default LoginScreen