import {createStackNavigator} from "@react-navigation/stack";
import {HOME_SCREEN_NAV, MAIN_SCREEN_NAV} from "../../App.tsx";
import MainScreen from "../screens/MainScreen.tsx";

const Stack = createStackNavigator();


const AppStack = () => {
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
                name={MAIN_SCREEN_NAV}
                component={MainScreen}
                options={{gestureEnabled: false}}
            />
        </Stack.Navigator>
    )
}


export default AppStack