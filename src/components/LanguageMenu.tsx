import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useTranslation} from "react-i18next";
import {blueColor} from "../GlobalStyles.tsx";

function LanguageMenu(): React.JSX.Element {
    const {t, i18n} = useTranslation();

    const toggleLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <Menu style={styles.settingsButtonContainer}>
            <MenuTrigger customStyles={{
                triggerWrapper: {
                    left: -45,
                },
            }}>
                <View style={styles.iconContainer}>
                    <Icon name="flag" size={30} color={blueColor}/>
                </View>
            </MenuTrigger>
            <MenuOptions customStyles={customMenuStyles}>
                <MenuOption onSelect={() => toggleLanguage('en')}>
                    <Text style={styles.menuOption}>{t('language-menu.english')}</Text>
                </MenuOption>
                <View style={styles.separator}/>
                <MenuOption onSelect={() => toggleLanguage('pl')}>
                    <Text style={styles.menuOption}>{t('language-menu.polish')}</Text>
                </MenuOption>
            </MenuOptions>
        </Menu>
    )
}

const customMenuStyles = {
    optionsContainer: {
        backgroundColor: 'transparent',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: blueColor,
        padding: 10,
        shadowColor: 'transparent',
    },

};

const styles = StyleSheet.create({
    settingsButtonContainer: {
        position: 'absolute',
        top: 8,
        left: 52,
        zIndex: 10,
    },
    iconContainer: {
        padding: 5,
    },
    menuOption: {
        fontWeight: 'bold',
        padding: 5,
        fontSize: 16,
    },
    separator: {
        height: 1,
        backgroundColor: blueColor,
    },
})

export default LanguageMenu