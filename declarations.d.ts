declare module '*.png' {
    const value: any;
    export default value;
}

declare module '*.jpg' {
    const value: any;
    export default value;
}

declare module '*.jpeg' {
    const value: any;
    export default value;
}

declare module './i18n' {
    import i18n from 'i18next';
    export default i18n;
}

declare module 'react-native-vector-icons/FontAwesome5'