import {StyleSheet} from "react-native";


export const bgGradientColors = ['#08144b', '#6826a6']
export const blueGradient = ['#5397fd', '#6826a6']
export const purpleColor = '#6826a6'
export const blueColor = '#5397fd'
export const darkBlueColor = '#08144b'

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },

    rlFormInputHeaderView: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },

    rlFormInputHeaderText: {
        fontSize: 36,
        color: darkBlueColor,
        fontFamily: 'Roboto-Regular',
        fontWeight: 'bold',
        letterSpacing: 1.2,
        textAlign: 'center',
        marginVertical: 50,
    },

    rlFormEnterInputText: {
        fontSize: 25,
        color: 'black',
        fontFamily: 'Roboto-Regular',
        fontWeight: 'bold',
        letterSpacing: 1.2,
        textAlign: 'center',
        marginBottom: 25
    },

    rlFormInputView: {
        flex: 7,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 25,
        overflow: 'hidden'
    },

    rlFormInput: {
        height: 55,
        width: 270,
        borderColor: darkBlueColor,
        borderWidth: 2,
        borderRadius: 15,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: 'transparent',
        color: 'black',
        fontSize: 18,
    },

    rlFormInputFail: {
        borderColor: 'red'
    },

    rlFormInputActionBtn: {
        height: 50,
        width: 270,
        marginVertical: 25,
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 15,
    },

    rlFormInputActionBtnText: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'Roboto-Regular',
        fontWeight: 'bold',
    }


})