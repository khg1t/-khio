import React, { useContext, useReducer, Dispatch, createContext, ReactNode } from 'react';

import { Theme } from 'common/theme/Theme.types';

interface ThemeContainer {
    theme: Theme;
}

export enum ThemeActionType {
    SetTheme,
}

export interface ThemeAction {
    type: ThemeActionType;
    theme?: Theme;
}

interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeStateContext = createContext<ThemeContainer | undefined>(undefined);
const ThemeDispatchContext = createContext<Dispatch<ThemeAction> | undefined>(undefined);

const themeReducer = (themeContainer: ThemeContainer, action: ThemeAction): ThemeContainer => {
    switch (action.type) {
        case ThemeActionType.SetTheme: {
            if (!action.theme) {
                throw new Error('SetTheme: missing required arg: theme');
            }

            return { ...themeContainer, theme: action.theme };
        }
        default: {
            throw new Error('Theme: unhandled action type', action.type);
        }
    }
};

export const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
    const key = 'khio-theme';

    const [state, dispatch] = useReducer(themeReducer, {
        theme: localStorage.getItem(key)
            ? JSON.parse(localStorage.getItem(key)!) // eslint-disable-line @typescript-eslint/no-non-null-assertion
            : Theme.Dark,
    });

    return (
        <ThemeStateContext.Provider value={state}>
            <ThemeDispatchContext.Provider value={dispatch}>{children}</ThemeDispatchContext.Provider>
        </ThemeStateContext.Provider>
    );
};

export const useThemeState = () => {
    const context = useContext(ThemeStateContext);

    if (!context) {
        throw new Error('useThemeState must be used within ThemeProvider');
    }

    return context;
};

export const useThemeDispatch = () => {
    const context = useContext(ThemeDispatchContext);

    if (!context) {
        throw new Error('useThemeDispatch must be used within ThemeProvider');
    }

    return context;
};

export const useTheme = (): [ThemeContainer, Dispatch<ThemeAction>] => {
    return [useThemeState(), useThemeDispatch()];
};
