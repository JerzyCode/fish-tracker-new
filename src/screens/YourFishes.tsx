import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {blueGradient} from "../GlobalStyles.tsx";
import LinearGradient from "react-native-linear-gradient";
import {useTranslation} from "react-i18next";
import {getUserId} from "../contexts/AuthContext.tsx";
import FishList from "../components/FishList.tsx";
import LoadingFragment from "../components/LoadingFragment.tsx";


function YourFishes({navigation}: any): React.JSX.Element {
    const {t} = useTranslation()
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const _userId = await getUserId();
            setUserId(_userId)
        };

        fetchUserData().then();
    }, [])

    return (
        <View style={styles.container}>
            <LinearGradient
                style={styles.contentContainer}
                colors={blueGradient}>

                <Text style={styles.startText}>
                    {t('user-fishes-screen.your-fishes')}
                </Text>

                {!userId ?
                    <LoadingFragment style={styles.container}/> :
                    <FishList userId={userId} navigation={navigation}/>
                }

            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
    },

    contentContainer: {
        flexGrow: 1,
        paddingTop: 45,
        paddingHorizontal: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    startText: {
        fontSize: 25,
        color: 'black',
        fontFamily: 'Roboto-Regular',
        fontWeight: 'bold',
        letterSpacing: 1.2,
        textAlign: 'center',
    },
})

export default YourFishes