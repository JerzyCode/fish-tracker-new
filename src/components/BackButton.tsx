import {StyleSheet, TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import React from "react";

interface BackButtonProps {
    navigation: any;
    color: any,
}

function BackButton({navigation, color}: BackButtonProps): React.JSX.Element {
    const goBack = () => {
        navigation.goBack()
    }

    return (
        <TouchableOpacity style={styles.placement} onPress={goBack}>
            <Icon name="arrow-left" size={30} color={color}></Icon>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    placement: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 100,
    }
})

export default BackButton