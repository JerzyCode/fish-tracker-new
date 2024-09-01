import React from "react";
import LinearGradient from "react-native-linear-gradient";
import {bgGradientColors, globalStyles} from "../GlobalStyles.tsx";
import {Text} from "react-native";
import BackButton from "../components/BackButton.tsx";


function RegisterScreen({navigation}: any): React.JSX.Element {

    return (
        <LinearGradient
            colors={bgGradientColors}
            style={globalStyles.container}>
            <BackButton navigation={navigation} />
            <Text>
                Register SCREEN
            </Text>


        </LinearGradient>

    )
}

export default RegisterScreen