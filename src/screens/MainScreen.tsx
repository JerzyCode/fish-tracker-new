import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {blueGradient, darkBlueColor, globalStyles} from "../GlobalStyles.tsx";
import LinearGradient from "react-native-linear-gradient";
import RandomFishFragment from "../components/RandomFishFragment.tsx";
import {useTranslation} from "react-i18next";
import {useInfoBar} from "../contexts/InfoBarContext.tsx";
import LoadingFragment from "../components/LoadingFragment.tsx";
import {getRandomFish} from "../services/FishService.ts";
import {ApiResponseType} from "../shared/classes.ts";

interface Fish {
    id: number;
    username: string;
    specie: string;
    size: number;
    weight: number;
    date: string;
}

function MainScreen({navigation}: any): React.JSX.Element {
    const {t} = useTranslation();
    const {dispatch} = useInfoBar();
    const [randomFish, setRandomFish] = useState<Fish | null>(null);
    const [isRandomFishLoading, setIsRandomFishLoading] = useState(true)


    const showErrorInfoBar = (message: string) => {
        dispatch({
            type: 'SHOW_INFO_BAR',
            payload: {
                message: message,
                type: 'error',
                visible: true,
                duration: 3000
            }
        });
    }

    const loadRandomFish = () => {
        setIsRandomFishLoading(true)
        getRandomFish()
            .then(response => {
                if (response.type === ApiResponseType.SUCCESS) {
                    const fish = response.body
                    setRandomFish(fish)
                } else {
                    showErrorInfoBar(t('main-screen.random-fish-load-error'))
                }
            })
            .catch(() => {
                showErrorInfoBar(t('main-screen.random-fish-load-error'))
            })
            .finally(() => {
                setIsRandomFishLoading(false)
            })
    }

    useEffect(() => {
        loadRandomFish()
    }, []);

    const onNewRandomFish = () => {
        loadRandomFish()
    }

    return (
        <View style={globalStyles.container}>
            <LinearGradient
                colors={blueGradient}
                style={styles.contentContainer}>
                <Text style={styles.header}>{t('main-screen.random-fish')}</Text>

                {isRandomFishLoading || !randomFish ?
                    <LoadingFragment style={styles.fishFragment}/> :
                    <View style={styles.fishFragment}>
                        <RandomFishFragment fishId={randomFish.id}
                                            specie={randomFish.specie}
                                            size={randomFish.size}
                                            weight={randomFish.weight}
                                            date={randomFish.date}
                                            navigation={navigation}/>
                    </View>
                }

                <TouchableOpacity style={globalStyles.rlFormInputActionBtn} onPress={onNewRandomFish}>
                    <Text style={globalStyles.rlFormInputActionBtnText}>{t('main-screen.reload-random-fish')}</Text>
                </TouchableOpacity>

                <Text style={styles.footer}>{t('main-screen.press-fish-info')}</Text>

            </LinearGradient>
        </View>
    )
}


const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        paddingTop: 50,
        padding: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fishFragment: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 35,
        fontWeight: 'bold',
        color: darkBlueColor,
        textAlign: 'center',
    },
    footer: {
        fontSize: 15,
        fontWeight: 'bold',
        color: darkBlueColor,
        textAlign: 'center',
        marginBottom: 15
    }
})
export default MainScreen