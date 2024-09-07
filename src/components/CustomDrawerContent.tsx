import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import {useTranslation} from "react-i18next";
import {AuthContext} from "../contexts/AuthContext.tsx";
import {useInfoBar} from "../contexts/InfoBarContext.tsx";
import {darkBlueColor, purpleColor} from "../GlobalStyles.tsx";

const CustomDrawerContent = (props: any) => {
    const {logout} = useContext(AuthContext) || {};
    const {dispatch} = useInfoBar();
    const {t} = useTranslation();

    const handleLogout = () => {
        if (logout) {
            logout()
            dispatch({
                type: 'SHOW_INFO_BAR',
                payload: {
                    message: t('app-drawer-nav.success-logout'),
                    type: 'success',
                    visible: true,
                    duration: 3000
                }
            });
        }
    };

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
            <View style={styles.drawerHeader}>
                <Text style={styles.headerText}>Fish Tracker</Text>
            </View>
            <DrawerItemList {...props} />
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>{t('app-drawer-nav.logout')}</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    drawerContent: {
        flexGrow: 1,
        justifyContent: 'center'
    },
    drawerHeader: {
        padding: 20,
        alignItems: 'center'
    },
    headerText: {
        fontSize: 20,
        color: 'lightgreen',
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 'auto',
        padding: 10,
        backgroundColor: 'transparent',
    },
    logoutButton: {
        padding: 10,
        backgroundColor: purpleColor,
        borderRadius: 4,
    },
    logoutButtonText: {
        textAlign: 'center',
        color: darkBlueColor,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CustomDrawerContent;
