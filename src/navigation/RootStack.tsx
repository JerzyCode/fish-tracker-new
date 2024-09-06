import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import AuthStack from "./AuthStack.tsx";
import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext.tsx";
import AppStack from "./AppStack.tsx";

const Stack = createStackNavigator();


function RootStack() {
    const authContext = useContext(AuthContext);
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {authContext?.isAuthenticated ? (
                    <Stack.Screen name="App" component={AppStack}/>
                ) : (
                    <Stack.Screen name="Auth" component={AuthStack}/>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootStack