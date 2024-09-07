import {MAIN_SCREEN_NAV, SETTINGS_NAV, YOUR_FISHES_NAV} from "../../App.tsx";
import MainScreen from "../screens/MainScreen.tsx";
import {createDrawerNavigator} from "@react-navigation/drawer";
import React from "react";
import MainHeaderNav from "../components/MainHeaderNav.tsx";
import Icon from 'react-native-vector-icons/FontAwesome5';

import {useTranslation} from "react-i18next";
import CustomDrawerContent from "../components/CustomDrawerContent.tsx";
import {darkBlueColor} from "../GlobalStyles.tsx";
import YourFishesScreen from "../screens/YourFishesScreen.tsx";
import SettingsScreen from "../screens/SettingsScreen.tsx";

const Drawer = createDrawerNavigator();


const AppStack = () => {
    const {t} = useTranslation();

    return (
        <Drawer.Navigator
            initialRouteName={MAIN_SCREEN_NAV}
            drawerContent={(props) => <CustomDrawerContent {...props} />}

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
                component={YourFishesScreen}
                options={{
                    drawerLabel: t('app-drawer-nav.your-fishes'),
                    drawerIcon: ({focused, size}) => (
                        <Icon name="fish" size={size} color={focused ? darkBlueColor : 'lightgreen'}/>
                    ),
                }}
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
        </Drawer.Navigator>
    )
}

export default AppStack