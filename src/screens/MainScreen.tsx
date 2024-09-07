import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {blueGradient, darkBlueColor, globalStyles} from "../GlobalStyles.tsx";
import LinearGradient from "react-native-linear-gradient";
import RandomFishFragment from "../components/RandomFishFragment.tsx";
import {useTranslation} from "react-i18next";


function MainScreen({navigation}: any): React.JSX.Element {
    const {t} = useTranslation();


    return (
        <View style={globalStyles.container}>
            <LinearGradient
                colors={blueGradient}
                style={styles.contentContainer}>
                <Text style={styles.header}>{t('main-screen.random-fish')}</Text>

                <RandomFishFragment fishId={30} username={'test'} specie={'test'} size={12} weight={12}
                                    date={'12.12.1212'}
                                    navigation={navigation}/>
            </LinearGradient>
        </View>
    )
}


const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        padding: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 35,
        fontWeight: 'bold',
        color: darkBlueColor,
        textAlign: 'center',
        marginBottom: 20
    },
})
export default MainScreen