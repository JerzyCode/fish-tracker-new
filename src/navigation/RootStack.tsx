import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import AuthStack from "./AuthStack.tsx";
import {View} from "react-native";

const Stack = createStackNavigator();


function RootStack() {
    const isAuthenticated = false

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {isAuthenticated ? (
                    <View></View>
                ) : (
                    <Stack.Screen name="Auth" component={AuthStack}/>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootStack