import React from "react";
import LinearGradient from "react-native-linear-gradient";
import {bgGradientColors, globalStyles} from "../GlobalStyles.tsx";
import {Text} from "react-native";


function RegisterScreen(): React.JSX.Element {

    return (
        <LinearGradient
            colors={bgGradientColors}
            style={globalStyles.container}>
            <Text>
                Register SCREEN
            </Text>


        </LinearGradient>

    )
}

export default RegisterScreen