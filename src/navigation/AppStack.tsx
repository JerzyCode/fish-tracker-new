import {FISH_DETAILS_NAV, MAIN_SCREEN_NAV, SETTINGS_NAV, USER_FISHES_NAV, YOUR_FISHES_NAV} from "../../App.tsx";
import MainScreen from "../screens/MainScreen.tsx";
import {createDrawerNavigator} from "@react-navigation/drawer";
import React, {useEffect, useState} from "react";
import MainHeaderNav from "../components/MainHeaderNav.tsx";
import Icon from 'react-native-vector-icons/FontAwesome5';

import {useTranslation} from "react-i18next";
import CustomDrawerContent from "../components/CustomDrawerContent.tsx";
import {darkBlueColor} from "../GlobalStyles.tsx";
import SettingsScreen from "../screens/SettingsScreen.tsx";
import FishDetailsScreen from "../screens/FishDetailsScreen.tsx";
import {getUserId, getUsername} from "../contexts/AuthContext.tsx";
import YourFishes from "../screens/YourFishes.tsx";
import UserFishesScreen from "../screens/UserFishesScreen.tsx";

const Drawer = createDrawerNavigator();


const AppStack = () => {
    const {t} = useTranslation();
    const [initialParams, setInitialParams] = useState<{ userId?: string; username?: string }>({});

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = await getUserId();
            const username = await getUsername();
            if (userId == null || username == null) {
                return
            }
            setInitialParams({userId, username});
        };

        fetchUserData().then();
    }, [])

    return (
        <Drawer.Navigator
            initialRouteName={MAIN_SCREEN_NAV}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            detachInactiveScreens={true}
            backBehavior={"history"}
            screenOptions={({navigation}) => ({
                drawerStyle: {
                    width: '70%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                drawerLabelStyle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                },
                drawerItemStyle: {
                    borderWidth: 1,
                    borderColor: 'lightgreen',
                },
                drawerActiveBackgroundColor: 'lightgreen',
                drawerActiveTintColor: darkBlueColor,
                drawerInactiveBackgroundColor: darkBlueColor,
                drawerInactiveTintColor: 'lightgreen',
                header: () => <MainHeaderNav navigation={navigation}/>,
                headerShown: true,
                headerTransparent: true,
                swipeEdgeWidth: 500,
            })}
        >
            <Drawer.Screen
                name={MAIN_SCREEN_NAV}
                component={MainScreen}
                options={{
                    drawerLabel: t('app-drawer-nav.home'),
                    drawerIcon: ({focused, size}) => (
                        <Icon name="home" size={size} color={focused ? darkBlueColor : 'lightgreen'}/>
                    ),
                }}
            />

            <Drawer.Screen
                name={YOUR_FISHES_NAV}
                component={YourFishes}
                options={{
                    drawerLabel: t('app-drawer-nav.your-fishes'),
                    drawerIcon: ({focused, size}) => (
                        <Icon name="fish" size={size} color={focused ? darkBlueColor : 'lightgreen'}/>
                    ),
                }}
                initialParams={initialParams}
            />

            <Drawer.Screen
                name={SETTINGS_NAV}
                component={SettingsScreen}
                options={{
                    drawerLabel: t('app-drawer-nav.settings'),
                    drawerIcon: ({focused, size}) => (
                        <Icon name="wrench" size={size} color={focused ? darkBlueColor : 'lightgreen'}/>
                    ),
                }}
            />
            <Drawer.Screen
                name={FISH_DETAILS_NAV}
                component={FishDetailsScreen}
                options={{
                    drawerItemStyle: {display: 'none'},
                }}
            />

            <Drawer.Screen
                name={USER_FISHES_NAV}
                component={UserFishesScreen}
                options={{
                    drawerItemStyle: {display: 'none'},
                }}
            />

        </Drawer.Navigator>
    )
}

export default AppStack