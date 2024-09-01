import React from "react";
import LinearGradient from "react-native-linear-gradient";
import {bgGradientColors, darkBlueColor, globalStyles} from "../GlobalStyles.tsx";
import {Text} from "react-native";
import BackButton from "../components/BackButton.tsx";


function LoginScreen({navigation}: any): React.JSX.Element {

    return (
        <LinearGradient
            colors={bgGradientColors}
            style={globalStyles.container}>
            <BackButton navigation={navigation} color={darkBlueColor}/>
            <Text>
                LOGIN SCREEN
            </Text>


        </LinearGradient>

    )
}

export default LoginScreen