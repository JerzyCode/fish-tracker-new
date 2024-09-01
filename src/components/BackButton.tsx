import {StyleSheet, TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import React from "react";
import {blueColor} from "../GlobalStyles.tsx";

interface BackButtonProps {
    navigation: any;
}

function BackButton({navigation}: BackButtonProps): React.JSX.Element {
    const goBack = () => {
        navigation.goBack()
    }

    return (
        <TouchableOpacity style={styles.placement} onPress={goBack}>
            <Icon name="arrow-left" size={30} color={blueColor}></Icon>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    placement: {
        position: 'absolute',
        top: 10,
        left: 10,
    }
})

export default BackButton