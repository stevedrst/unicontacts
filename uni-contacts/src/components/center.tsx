import React from 'react';

interface ICenterProps {
    children: JSX.Element | JSX.Element[];

    className?: string;
}

// This component renders its component child in the center of the screen. Mainly used for the loading component. 
export const Center: React.FunctionComponent<ICenterProps> = (props) => {

    return (
        <div className={`columns center-component ${props.className}`}>
            {props.children}
        </div>
    );
}