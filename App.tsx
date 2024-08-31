import React from 'react';
import {SafeAreaView,} from 'react-native';
import HomeScreen from "./src/screens/HomeScreen.tsx";
import {globalStyles} from "./src/GlobalStyles.tsx";


function App(): React.JSX.Element {

    console.log('app started123!')

    return (
        <SafeAreaView style={globalStyles.container}>
            <HomeScreen></HomeScreen>
        </SafeAreaView>
    );
}


export default App;
