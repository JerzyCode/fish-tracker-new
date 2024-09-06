import {MAIN_SCREEN_NAV} from "../../App.tsx";
import MainScreen from "../screens/MainScreen.tsx";
import {createDrawerNavigator} from "@react-navigation/drawer";
import React from "react";
import MainHeaderNav from "../components/MainHeaderNav.tsx";
import {useTranslation} from "react-i18next";
import CustomDrawerContent from "../components/CustomDrawerContent.tsx";

const Drawer = createDrawerNavigator();


const AppStack = () => {
    const {t, i18n} = useTranslation();

    //TODO wystylować to z CustomDrawerContent

    return (
        <Drawer.Navigator
            initialRouteName={MAIN_SCREEN_NAV}
            drawerContent={(props) => <CustomDrawerContent {...props} />}

            screenOptions={({navigation}) => ({
                drawerStyle: {
                    width: '70%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', //zmienia tło po rozwinieciu
                },
                drawerLabelStyle: {
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 'bold',
                },
                drawerItemStyle: {
                    marginVertical: 7,
                },
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
                }}
            />
        </Drawer.Navigator>
    )
}


export default AppStack