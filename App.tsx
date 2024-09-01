import React, {useEffect} from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from '@react-navigation/native';

import LoginScreen from "./src/screens/LoginScreen.tsx";
import RegisterScreen from "./src/screens/RegisterScreen.tsx";
import HomeScreen from "./src/screens/HomeScreen.tsx";
import {enableScreens} from "react-native-screens";
import {I18nextProvider} from "react-i18next";
import i18n from './src/locales/i18n.js';
import Orientation from "react-native-orientation-locker";
import {InfoBarProvider} from "./src/contexts/InfoBarContext.tsx";

export const LOGIN_SCREEN_NAV = "LoginScreenNav"
export const REGISTER_SCREEN_NAV = "RegisterScreenNav"
export const HOME_SCREEN_NAV = "HomeScreenNav"

const Stack = createStackNavigator();

enableScreens();

function App(): React.JSX.Element {
    console.debug('Launched App!')

    useEffect(() => {
        Orientation.lockToPortrait();
        return () => {
            Orientation.unlockAllOrientations();
        };
    })

    return (
        <I18nextProvider i18n={i18n}>
            <InfoBarProvider>

                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName={HOME_SCREEN_NAV}
                        screenOptions={{
                            headerShown: false,
                            gestureEnabled: true,
                            transitionSpec: {
                                open: {animation: 'timing', config: {duration: 500}},
                                close: {animation: 'timing', config: {duration: 300}},
                            },
                            cardStyleInterpolator: ({current, next, layouts}) => {
                                return {
                                    cardStyle: {
                                        transform: [
                                            {
                                                translateY: current.progress.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [layouts.screen.height, 0],
                                                }),
                                            },
                                        ],
                                        opacity: current.progress.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, 1],
                                        }),
                                    },
                                };
                            },
                        }}
                    >
                        <Stack.Screen name={HOME_SCREEN_NAV} component={HomeScreen}/>
                        <Stack.Screen name={LOGIN_SCREEN_NAV} component={LoginScreen}/>
                        <Stack.Screen name={REGISTER_SCREEN_NAV} component={RegisterScreen}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </InfoBarProvider>

        </I18nextProvider>

    );
}


export default App;
