import {HOME_SCREEN_NAV, MAIN_SCREEN_NAV} from "../../App.tsx";
import MainScreen from "../screens/MainScreen.tsx";
import {createDrawerNavigator} from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen.tsx";

const Drawer = createDrawerNavigator();


const AppStack = () => {
    return (
        <Drawer.Navigator initialRouteName={MAIN_SCREEN_NAV}>
            <Drawer.Screen name={MAIN_SCREEN_NAV} component={MainScreen}/>
            <Drawer.Screen name={HOME_SCREEN_NAV} component={HomeScreen}/>
        </Drawer.Navigator>

    )
}


export default AppStack