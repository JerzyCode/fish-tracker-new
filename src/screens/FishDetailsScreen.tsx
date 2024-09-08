import {Text, View} from "react-native";
import React from "react";
import {globalStyles} from "../GlobalStyles.tsx";

function FishDetailsScreen(): React.JSX.Element {
    return (
        <View style={globalStyles.container}>
            <Text style={{color: 'black'}}>
                Fish Details Screen
            </Text>
        </View>
    )
}

export default FishDetailsScreen