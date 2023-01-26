import React from 'react';
import { OidcProvider } from '@axa-fr/react-oidc';
import { environment } from './environment/env';
import RouteList from './Routes';
import { BrowserRouter as Router } from "react-router-dom";
import { env } from 'process';

// TODO: Fix renew tokens for the session. 
const configuration = {
  authority: environment.authority,
  redirect_uri: 'http://localhost:4200/auth',
  silent_redirect_uri: 'http://localhost:4200/silent-renew.html',
  client_id: environment.client_id,
  scope: environment.scope,
};


function App() {
  return (
      <OidcProvider configuration={configuration}>
        <Router>
          <RouteList />
        </Router>
    </OidcProvider>
    
  );
}

export default App;
