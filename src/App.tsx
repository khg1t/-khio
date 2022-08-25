import React, { FunctionComponent } from 'react';

import { useTheme } from 'common/theme/Theme.store';

export const App: FunctionComponent = () => {
    const [{ theme }] = useTheme();

    return <div className={`khio-${theme}`}>khio</div>;
};
