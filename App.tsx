import React, {useEffect} from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {enableScreens} from "react-native-screens";
import {I18nextProvider} from "react-i18next";
import i18n from './src/locales/i18n.js';
import Orientation from "react-native-orientation-locker";
import {InfoBarProvider} from "./src/contexts/InfoBarContext.tsx";
import RootStack from "./src/navigation/RootStack.tsx";

export const LOGIN_SCREEN_NAV = "LoginScreenNav"
export const REGISTER_SCREEN_NAV = "RegisterScreenNav"
export const HOME_SCREEN_NAV = "HomeScreenNav"

const Stack = createStackNavigator();
export const SERVER_URL = "https://fish-tracker.onrender.com/fish-tracker"
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
                <RootStack/>
            </InfoBarProvider>
        </I18nextProvider>

    );
}


export default App;
