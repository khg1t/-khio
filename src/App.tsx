import React, { FunctionComponent, useEffect } from 'react';

import { ThemeSwitch } from 'common/theme/ThemeSwitch';
import { useTheme } from 'common/theme/Theme.store';

import 'App.scss';

export const App: FunctionComponent = () => {
    const [{ theme }] = useTheme();

    return (
        <div className={`khio-theme-${theme}`}>
            <ThemeSwitch />
        </div>
    );
};
