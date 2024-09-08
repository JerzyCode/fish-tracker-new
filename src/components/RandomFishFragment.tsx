import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import {darkBlueColor, darkGray, randomFishFragmentFontColor} from "../GlobalStyles.tsx";
import LoadingFragment from "./LoadingFragment.tsx";
import {getFishImage} from "../services/FishService.ts";
import {ApiResponseType} from "../shared/classes.ts";
import {useInfoBar} from "../contexts/InfoBarContext.tsx";
import {FISH_DETAILS_NAV} from "../../App.tsx";


const SIZE_SUFFIX = "cm"
const WEIGHT_SUFFIX = "kg"

interface BestFishProps {
    fishId: number,
    specie: string,
    size: number,
    weight: number,
    date: string,
    navigation: any;
}

const RandomFishFragment = ({
                                fishId,
                                specie,
                                size,
                                weight,
                                date,
                                navigation
                            }: BestFishProps): React.JSX.Element => {
    const {t} = useTranslation();
    const {dispatch} = useInfoBar();
    const [isLoadingImage, setIsLoadingImage] = useState(false)
    const [fishImageUrl, setFishImageUrl] = useState(null)

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

    useEffect(() => {
        const loadImage = async () => {
            setIsLoadingImage(true)
            getFishImage(fishId)
                .then(response => {
                    if (response.type === ApiResponseType.SUCCESS) {
                        const imageUrl = response.body
                        setFishImageUrl(imageUrl)
                    } else {
                        showErrorInfoBar(t('best-fish-fragment.image-load-fail'))
                    }
                })
                .catch(() => {
                    showErrorInfoBar(t('best-fish-fragment.image-load-fail'))
                })
                .finally(() => {
                    setIsLoadingImage(false)
                })
        }

        loadImage().then()
    }, []);

    const goToFishDetailsView = () => {
        navigation.navigate(FISH_DETAILS_NAV)
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => goToFishDetailsView()}>
            <View style={styles.contentContainer}>
                <Text style={styles.specie}>{t('fish.specie')}: {specie}</Text>
                <View style={styles.sizeRow}>
                    <Text style={styles.smallText}>{t("fish.size")}: {size}{SIZE_SUFFIX}</Text>
                    <Text style={styles.smallText}>{t('fish.weight')}: {weight}{WEIGHT_SUFFIX}</Text>
                </View>
            </View>
            <View>
                <View style={styles.imageContainer}>
                    {isLoadingImage || !fishImageUrl ? <LoadingFragment style={styles.loadingFragment}/> :
                        <ImageBackground
                            source={{uri: fishImageUrl}}
                            resizeMode={"contain"}
                            style={styles.image}
                            imageStyle={styles.imageStyle}
                        />}
                </View>
            </View>

            <Text style={styles.dateText}>{t('fish.date')}: {date} </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        margin: 10,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: darkBlueColor,
        backgroundColor: darkGray
    },
    sizeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    userView: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        color: darkBlueColor,
        marginBottom: 5,
        marginLeft: 10
    },
    specie: {
        fontSize: 18,
        fontWeight: 'bold',
        color: randomFishFragmentFontColor,
    },
    smallText: {
        fontSize: 16,
        marginLeft: 5,
        marginRight: 5,
        color: randomFishFragmentFontColor,
    },
    dateText: {
        fontSize: 16,
        color: randomFishFragmentFontColor,
        fontWeight: 'bold'
    },
    imageContainer: {
        marginVertical: 10,
        height: 200,
        width: 280,
        borderRadius: 15,
        overflow: 'hidden',
    },
    loadingFragment: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        flex: 1,
    },
    imageStyle: {
        borderRadius: 15,
    },
});

export default RandomFishFragment