import React from "react";
import {Text, View} from "react-native";
import {globalStyles} from "../GlobalStyles.tsx";

function YourFishesScreen(): React.JSX.Element {

    return (
        <View style={globalStyles.container}>
            <Text style={{color: 'black'}}>
                Your Fishes Screen
            </Text>
        </View>
    )
};

export default YourFishesScreen