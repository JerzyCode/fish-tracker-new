import {Text, View} from "react-native";
import React from "react";
import {globalStyles} from "../GlobalStyles.tsx";

function MainScreen(): React.JSX.Element {
    return (
        <View style={globalStyles.container}>
            <Text>
                TEST
            </Text>
        </View>
    )
}

export default MainScreen