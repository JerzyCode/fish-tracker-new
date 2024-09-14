import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useRoute} from "@react-navigation/native";
import {deleteFish, getFishDetails, getFishImage} from "../services/FishService.ts";
import LoadingFragment from "../components/LoadingFragment.tsx";
import {useInfoBar} from "../contexts/InfoBarContext.tsx";
import {ApiResponseType} from "../shared/classes.ts";
import {useTranslation} from "react-i18next";
import Icon from "react-native-vector-icons/FontAwesome5";
import {blueGradient, darkGray, white} from "../GlobalStyles.tsx";
import LinearGradient from "react-native-linear-gradient";
import {getUserId} from "../contexts/AuthContext.tsx";
import DeleteFishModal from "../components/DeleteFishModal.tsx";
import {USER_FISHES_NAV} from "../../App.tsx";


interface FishDetails {
    id: number;
    date: string;
    specie: string;
    size: number;
    weight: number;
    location: string;
    method: string;
    bait: string;
    userId: number;
    username: string;
}

const SIZE_SUFFIX = 'cm'
const WEIGHT_SUFFIX = 'kg'


const UserBar = ({navigation, userId, username}: { navigation: any, userId: number, username: string }) => {
    const [profilePictureUri, setProfilePictureUri] = useState(require('../../assets/user-default.png'))

    const goToUserFishesView = () => {
        navigation.navigate(USER_FISHES_NAV, {userId, username});
    }

    return (
        <TouchableOpacity style={styles.userBarContainer} onPress={goToUserFishesView}>
            <Image
                source={profilePictureUri}
                style={styles.profilePicture}
            />
            <Text style={styles.userText}>{username}</Text>
        </TouchableOpacity>
    )
}

function FishDetailsScreen({navigation}: any): React.JSX.Element {
    const route = useRoute();
    const {dispatch} = useInfoBar();
    const {t} = useTranslation();
    const {fishId} = route.params as { fishId: number };
    const [isFishDetailsLoading, setIsFishDetailsLoading] = useState(true)
    const [isLoadingImage, setIsLoadingImage] = useState(false)
    const [fishDetails, setFishDetails] = useState<FishDetails | null>(null)
    const [fishImageUrl, setFishImageUrl] = useState(null)
    const [isYourView, setIsYourView] = useState(true)
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)


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

    const showSuccessInfoBar = (message: string) => {
        dispatch({
            type: 'SHOW_INFO_BAR',
            payload: {
                message: message,
                type: 'success',
                visible: true,
                duration: 3000
            }
        });
    };

    useEffect(() => {
        setIsFishDetailsLoading(true)
        getFishDetails(fishId)
            .then(async response => {
                if (response.type === ApiResponseType.SUCCESS) {
                    const yourId = await getUserId()
                    const fishDetails = response.body
                    setFishDetails(fishDetails)
                    setIsYourView(fishDetails.userId == yourId)
                } else {
                    showErrorInfoBar(t('fish-details-screen.fish-details-load-error'))
                }
            })
            .catch(() => {
                showErrorInfoBar(t('fish-details-screen.fish-details-load-error'))
            })
            .finally(() => {
                setIsFishDetailsLoading(false)
            })
    }, [fishId]);

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


    const handleDeleteFish = () => {
        setIsDeleteModalVisible(false)
        setIsFishDetailsLoading(true)
        deleteFish(fishId)
            .then(response => {
                if (response?.type === ApiResponseType.SUCCESS) {
                    showSuccessInfoBar(t('fish-details-screen.delete-fish-success'))
                    navigation.goBack()
                } else {
                    showErrorInfoBar(t('fish-details-screen.delete-fish-error'))
                }
            })
            .catch(() => {
                showErrorInfoBar(t('fish-details-screen.delete-fish-error'))
            })
            .finally(() => {
                setIsFishDetailsLoading(false)
            })
    }


    if (isFishDetailsLoading || fishDetails === null) {
        return <LinearGradient
            colors={blueGradient} style={styles.container}>
            <LoadingFragment style={[styles.detailsContainer, {borderWidth: 0, backgroundColor: 'transparent'}]}/>
        </LinearGradient>
    }

    return (
        <LinearGradient
            colors={blueGradient} style={styles.container}>
            <UserBar navigation={navigation} userId={fishDetails.userId} username={fishDetails.username}/>
            <DeleteFishModal isVisible={isDeleteModalVisible}
                             handleDelete={handleDeleteFish}
                             onClose={() => setIsDeleteModalVisible(false)}/>
            <View style={styles.detailsContainer}>
                <View style={styles.fishDetails}>
                    <View style={styles.firstRow}>
                        <Text style={styles.detailsText}>
                            {t('fish-details-screen.fish-details-text')}
                        </Text>
                        {isYourView &&
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity>
                                    <Icon style={[styles.iconButton, {marginRight: 2}]} name="edit" size={30}
                                          color={white}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setIsDeleteModalVisible(true)}>
                                    <Icon style={[styles.iconButton, {marginLeft: 2}]} name="trash-alt" size={30}
                                          color={white}/>
                                </TouchableOpacity>
                            </View>}
                    </View>

                    <View style={styles.descRow}>
                        <Text style={styles.detailTitle}>{t('fish.specie')}: </Text>
                        <Text style={styles.detailValue}>{fishDetails.specie}</Text>
                    </View>

                    <View style={styles.descRow}>
                        <Text style={styles.detailTitle}>{t('fish.size')}: </Text>
                        <Text style={styles.detailValue}>{fishDetails.size}{SIZE_SUFFIX}</Text>
                    </View>

                    <View style={styles.descRow}>
                        <Text style={styles.detailTitle}>{t('fish.weight')}: </Text>
                        <Text style={styles.detailValue}>{fishDetails.weight}{WEIGHT_SUFFIX}</Text>
                    </View>

                    <View style={styles.descRow}>
                        <Text style={styles.detailTitle}>{t('fish.date')}: </Text>
                        <Text style={styles.detailValue}>{fishDetails.date}</Text>
                    </View>

                    <View style={styles.descRow}>
                        <Text style={styles.detailTitle}>{t('fish.location')}: </Text>
                        <Text style={styles.detailValue}>{fishDetails.location}</Text>
                    </View>

                    <View style={styles.descRow}>
                        <Text style={styles.detailTitle}>{t('fish.method')}: </Text>
                        <Text style={styles.detailValue}>{fishDetails.method}</Text>
                    </View>

                    <View style={styles.descRow}>
                        <Text style={styles.detailTitle}>{t('fish.bait')}: </Text>
                        <Text style={styles.detailValue}>{fishDetails.bait}</Text>
                    </View>

                    <View style={styles.imageContainer}>
                        {isLoadingImage || !fishImageUrl ? <LoadingFragment style={styles.loadingFragment}/> :
                            <ImageBackground
                                source={{uri: fishImageUrl}}
                                resizeMode={"contain"}
                                style={styles.image}
                            />}
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
}

export default FishDetailsScreen;

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        padding: 10,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    userBarContainer: {
        flexDirection: 'row',
        width: '100%',
        margin: 15,
        padding: 10,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    fishDetails: {
        flex: 1,
        width: '100%'
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 30,
        marginRight: 10,
    },
    userText: {
        marginLeft: 15,
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
    },
    detailsContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: darkGray,
        padding: 10,
    },
    detailsText: {
        fontSize: 20,
        color: white,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    detailTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: white
    },
    detailValue: {
        marginLeft: 10,
        fontSize: 17,
        color: white,
    },
    descRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },

    iconButton: {
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: white
    },

    firstRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    loadingFragment: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        marginTop: 10,
        height: 260,
        width: '100%',
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: 'black',
    },
    image: {
        flex: 1,
    },
});
