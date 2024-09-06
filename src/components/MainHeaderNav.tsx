import {StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome5';
import {purpleColor} from "../GlobalStyles.tsx";

function MainHeaderNav({navigation}: any): React.JSX.Element {


    const openDrawer = () => {
        navigation.toggleDrawer()
    }

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.menuButtonContainer} onPress={openDrawer}>
                <Icon name="bars" size={24} color={purpleColor}/>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    headerContainer: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'transparent',
    },
    menuButtonContainer: {
        marginLeft: 10,
    },
});

export default MainHeaderNav