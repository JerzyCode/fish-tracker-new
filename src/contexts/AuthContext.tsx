import React, {createContext, ReactNode, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string, id: number, username: string) => void;
    logout: () => void;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (token: string, id: number, username: string) => {
        AsyncStorage.setItem('userToken', token)
        AsyncStorage.setItem('userId', id.toString())
        AsyncStorage.setItem('username', username)

        setIsAuthenticated(true)
    }

    const logout = () => {
        AsyncStorage.removeItem('userToken')
        AsyncStorage.removeItem('userId')
        AsyncStorage.removeItem('username')
        setIsAuthenticated(false)
    }

    const isLoggedIn = async () => {
        try {
            let userToken = await AsyncStorage.getItem('userToken')
            let userId = await AsyncStorage.getItem('userId')
            let username = await AsyncStorage.getItem('username')
            if (userToken && userId && username) {
                setIsAuthenticated(true)
            }
            console.log('logged in, token=' + userToken)
        } catch (err) {
            console.error('isLoggedIn() error=' + err)
        }
    }

    useEffect(() => {
        isLoggedIn().then(r => {
        })
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const getUserToken = async () => {
    try {
        return await AsyncStorage.getItem('userToken');
    } catch (error) {
        console.error('Failed to fetch user token:', error);
        return null;
    }
}

export const getUserId = async () => {
    try {
        return await AsyncStorage.getItem('userId');
    } catch (error) {
        console.error('Failed to fetch user ID:', error);
        return null;
    }
}

export const getUsername = async () => {
    try {
        return await AsyncStorage.getItem('username');
    } catch (error) {
        console.error('Failed to fetch username:', error);
        return null;
    }
}