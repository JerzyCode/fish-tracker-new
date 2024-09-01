import {createStackNavigator} from "@react-navigation/stack";
import {HOME_SCREEN_NAV, LOGIN_SCREEN_NAV, REGISTER_SCREEN_NAV} from "../../App.tsx";
import RegisterScreen from "../screens/RegisterScreen.tsx";
import LoginScreen from "../screens/LoginScreen.tsx";
import HomeScreen from "../screens/HomeScreen.tsx";

const Stack = createStackNavigator();


const AuthStack = () => {
    return (
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
            <Stack.Screen
                name={HOME_SCREEN_NAV}
                component={HomeScreen}
            />
            <Stack.Screen
                name={REGISTER_SCREEN_NAV}
                component={RegisterScreen}
            />
            <Stack.Screen
                name={LOGIN_SCREEN_NAV}
                component={LoginScreen}
            />
        </Stack.Navigator>
    )
}


export default AuthStack