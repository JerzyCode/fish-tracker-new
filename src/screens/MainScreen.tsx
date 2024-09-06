import {StyleSheet, View} from "react-native";
import React from "react";
import {blueGradient, globalStyles} from "../GlobalStyles.tsx";
import LinearGradient from "react-native-linear-gradient";

function MainScreen(): React.JSX.Element {
    return (
        <View style={globalStyles.container}>
            <LinearGradient
                colors={blueGradient}
                style={styles.contentContainer}>
            </LinearGradient>
        </View>
    )
}


const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        width: '100%',
    }
})
export default MainScreen