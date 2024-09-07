import React from "react";
import {ActivityIndicator, StyleProp, View, ViewStyle} from "react-native";

interface LoadingFragmentProps {
    style?: StyleProp<ViewStyle>;
}

function LoadingFragment({style}: LoadingFragmentProps): React.JSX.Element {
    return (
        <View style={style}>
            <ActivityIndicator size="large" animating={true}/>
        </View>
    )
}

export default LoadingFragment
