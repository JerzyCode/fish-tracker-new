import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {blueGradient} from "../GlobalStyles.tsx";
import LinearGradient from "react-native-linear-gradient";
import {useTranslation} from "react-i18next";
import {DrawerScreenProps} from "@react-navigation/drawer";
import FishList from "../components/FishList.tsx";

export type RootDrawerParamList = {
    UserFishesScreenNav: {
        userId: string;
        username: string;
        isYourView?: boolean;
    };
};

type UserFishesScreenProps = DrawerScreenProps<RootDrawerParamList, 'UserFishesScreenNav'>;

function UserFishesScreen({navigation, route}: UserFishesScreenProps): React.JSX.Element {
    const {t} = useTranslation()
    const {userId, username} = route.params;

    return (
        <View style={styles.container}>
            <LinearGradient
                style={styles.contentContainer}
                colors={blueGradient}>
                <TouchableOpacity>
                    {/*TODO filter button <Text>Filter</Text>*/}
                </TouchableOpacity>
                <Text style={styles.startText}>
                    {t('user-fishes-screen.user-fishes') + username}
                </Text>

                <FishList userId={userId} navigation={navigation}/>

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

export default UserFishesScreen