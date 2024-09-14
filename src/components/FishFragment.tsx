import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import {darkGray, randomFishFragmentFontColor, white} from "../GlobalStyles.tsx";
import {getFishImage} from "../services/FishService.ts";
import {ApiResponseType} from "../shared/classes.ts";
import {useInfoBar} from "../contexts/InfoBarContext.tsx";
import {FISH_DETAILS_NAV} from "../../App.tsx";
import LoadingFragment from "./LoadingFragment.tsx";


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

const FishFragment = ({
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
        navigation.navigate(FISH_DETAILS_NAV, {fishId});
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => goToFishDetailsView()}>
            <View style={styles.row}>
                <View style={styles.columnLeft}>
                    <Text style={styles.specie}>{t('fish.specie')}: {specie}</Text>
                    <Text style={styles.smallText}>{t("fish.size")}: {size}{SIZE_SUFFIX}</Text>
                    <Text style={styles.smallText}>{t('fish.weight')}: {weight}{WEIGHT_SUFFIX}</Text>
                    <Text style={styles.dateText}>{t('fish.date')}: {date} </Text>
                </View>
                <View style={styles.columnRight}>
                    <View style={styles.imageContainer}>
                        {isLoadingImage || !fishImageUrl ? <LoadingFragment style={styles.loadingFragment}/> :
                            <ImageBackground
                                source={{uri: fishImageUrl}}
                                resizeMode={"cover"}
                                style={styles.image}
                                imageStyle={styles.imageStyle}
                            />}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginVertical: 5,
        alignItems: 'center',
        width: '100%',
        backgroundColor: darkGray
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    columnLeft: {
        flex: 0.45,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 5,
    },
    columnRight: {
        flex: 0.55,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
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
    specie: {
        fontSize: 16,
        fontWeight: 'bold',
        color: randomFishFragmentFontColor,
    },
    smallText: {
        fontSize: 16,
        color: randomFishFragmentFontColor,
    },
    dateText: {
        fontSize: 16,
        color: randomFishFragmentFontColor,
        fontWeight: 'bold'
    },
    imageContainer: {
        height: 100,
        width: '100%',
        borderRadius: 15,
        backgroundColor: white,
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

export default FishFragment