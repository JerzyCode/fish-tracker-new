import React, {useEffect, useState} from "react";
import {Animated, StyleSheet, View} from "react-native";
import {useTranslation} from "react-i18next";
import LoadingFragment from "../components/LoadingFragment.tsx";
import {useInfoBar} from "../contexts/InfoBarContext.tsx";
import {getAllUserFishes} from "../services/FishService.ts";
import {ApiResponseType} from "../shared/classes.ts";
import FishFragment from "../components/FishFragment.tsx";
import FlatList = Animated.FlatList;


interface FishListProps {
    userId: string | null;
    navigation: any;
}

function FishList({userId, navigation}: FishListProps): React.JSX.Element {
    const {t} = useTranslation()
    const {dispatch} = useInfoBar();
    const [isLoadingFishList, setIsLoadingFishList] = useState(true)
    const [fishes, setFishes] = useState(null)

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
        setIsLoadingFishList(true)
        if (userId == null) {
            return
        }
        getAllUserFishes(userId)
            .then(async response => {
                if (response.type === ApiResponseType.SUCCESS) {
                    const fishes = response.body
                    setFishes(fishes)
                } else {
                    showErrorInfoBar(t('user-fishes-screen.get-fishes-error'))
                }
            })
            .catch(() => {
                showErrorInfoBar(t('user-fishes-screen.get-fishes-error'))
            })
            .finally(() => {
                setIsLoadingFishList(false)
            })
    }, [userId]);


    return (
        isLoadingFishList || fishes === null ?
            <LoadingFragment style={styles.fishesContainer}/> :
            <View style={styles.fishesContainer}>
                <FlatList style={styles.flatList} data={fishes} renderItem={({item}) => (
                    <FishFragment fishId={item.id}
                                  specie={item.specie}
                                  size={item.size}
                                  weight={item.weight}
                                  date={item.date}
                                  navigation={navigation}/>
                )}/>
            </View>
    )
}

const styles = StyleSheet.create({
    flatList: {
        width: '100%',
    },

    fishesContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

})

export default FishList