import {Animated, StyleSheet, Text} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

import React, {useEffect, useRef} from "react";

interface InfoBarProps {
    message: string;
    type: "success" | "error" | "warning" | "info";
    visible: boolean;
    onHide: () => void;
    duration?: number;
}

function InfoBar({message, type, visible, onHide, duration = 3000}: InfoBarProps): React.JSX.Element {
    const slideAnim = useRef(new Animated.Value(-100)).current;
    const progressAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(progressAnim, {
                    toValue: 0,
                    duration,
                    useNativeDriver: false,
                })
            ]).start(() => {
                Animated.timing(slideAnim, {
                    toValue: -100,
                    duration: 500,
                    useNativeDriver: true,
                }).start(onHide);
            });
        } else {
            slideAnim.setValue(-100);
            progressAnim.setValue(1);
        }
    }, [visible, slideAnim, progressAnim, onHide, duration]);

    const getBarStyle = () => {
        switch (type) {
            case "success":
                return {
                    backgroundColor: "#d4edda",
                    icon: "check-circle",
                    iconColor: "#28a745",
                    progressColor: "#28a745"
                };
            case "error":
                return {
                    backgroundColor: "#f8d7da",
                    icon: "exclamation-circle",
                    iconColor: "#dc3545",
                    progressColor: "#dc3545"
                };
            case "warning":
                return {
                    backgroundColor: "#fff3cd",
                    icon: "exclamation-triangle",
                    iconColor: "#ffc107",
                    progressColor: "#ffc107"
                };
            case "info":
            default:
                return {
                    backgroundColor: "#d1ecf1",
                    icon: "info-circle",
                    iconColor: "#17a2b8",
                    progressColor: "#17a2b8"
                };
        }
    };

    const {backgroundColor, icon, iconColor, progressColor} = getBarStyle();

    return (
        <Animated.View style={[styles.infoBar, {backgroundColor, transform: [{translateY: slideAnim}]}]}>
            <Icon name={icon} size={24} color={iconColor} style={styles.icon}/>
            <Text style={styles.message}>{message}</Text>
            <Animated.View
                style={[
                    styles.progressBar,
                    {
                        backgroundColor: progressColor,
                        width: progressAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0%', '100%'],
                        }),
                    },
                ]}
            />
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    infoBar: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        marginVertical: 10,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
        zIndex: 101,
    },
    icon: {
        marginRight: 10,
    },
    message: {
        fontSize: 16,
        color: "#333",
        flex: 1,
    },
    progressBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 5,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
});

export default InfoBar