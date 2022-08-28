import React, { FunctionComponent } from 'react';

export const ThemeSwitch: FunctionComponent = () => {
    return (
        <div className="btn-group">
            <button className="btn btn-default btn-ghost">{'Dark'}</button>
            <button className="btn btn-default btn-ghost">{'Light'}</button>
        </div>
    );
};
