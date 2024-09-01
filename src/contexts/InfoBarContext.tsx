import React, {createContext, ReactNode, useContext, useReducer} from "react";
import InfoBar from "../components/InfoBar.tsx";

interface InfoBarState {
    message: string;
    type: "success" | "error" | "warning" | "info";
    visible: boolean;
    duration: number;
}

type InfoBarAction =
    | { type: 'SHOW_INFO_BAR', payload: InfoBarState }
    | { type: 'HIDE_INFO_BAR' };

const InfoBarContext = createContext<{
    state: InfoBarState;
    dispatch: React.Dispatch<InfoBarAction>;
} | undefined>(undefined);

const infoBarReducer = (state: InfoBarState, action: InfoBarAction): InfoBarState => {
    switch (action.type) {
        case 'SHOW_INFO_BAR':
            return {...action.payload, visible: true};
        case 'HIDE_INFO_BAR':
            return {...state, visible: false};
        default:
            return state;
    }
};


export const InfoBarProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [state, dispatch] = useReducer(infoBarReducer, {
        message: '',
        type: 'info',
        visible: false,
        duration: 3000,
    });
    return (
        <InfoBarContext.Provider value={{state, dispatch}}>
            {children}
            {state.visible && (
                <InfoBar
                    message={state.message}
                    type={state.type}
                    visible={state.visible}
                    onHide={() => dispatch({type: 'HIDE_INFO_BAR'})}
                    duration={state.duration}
                />
            )}
        </InfoBarContext.Provider>
    );

}


export const useInfoBar = () => {
    const context = useContext(InfoBarContext);
    if (context === undefined) {
        throw new Error('useInfoBar must be used within an InfoBarProvider');
    }
    return context;
};