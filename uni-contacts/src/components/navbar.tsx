import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOidcAccessToken, useOidc  } from '@axa-fr/react-oidc';
// import { Logout } from '../components/logout';

interface INavbarProps {}

let styles = require('./navbar.css');

// The NavBar component returns the full navbar if a user is logged in. If not it will only return the logo in the navbar. 
export const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
    const { accessToken} = useOidcAccessToken();
    const { login, logout, isAuthenticated } = useOidc()

    return (
        <div>
            <nav>
                <ul>
                    <li className="login">
                    {!isAuthenticated ?
                        <button onClick={() => login('/contacts')}>Login</button>
                    :
                        <button onClick={() => logout()}>Logout</button>
                    }
                    </li>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/contacts">Contacts</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}