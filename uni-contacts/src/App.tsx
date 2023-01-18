import React from 'react';
import { OidcProvider } from '@axa-fr/react-oidc';
import { environment } from './environment/env';
import RouteList from './Routes';
import { BrowserRouter as Router } from "react-router-dom";

const configuration = {
  authority: environment.authority,
  redirect_uri: environment.redirect_uri,
  postLogoutRedirectUri: environment.post_logout_redirect_uri,
  client_id: environment.client_id,
  scope: environment.scope,
  responseType: 'code',
  silentRenew: true,
  useRefreshToken: true,
  silentRenewUrl: `${environment.silent_redirect_uri}/silent-renew.html`,
  logLevel: 1,
  };


function App() {
  return (
    <OidcProvider configuration={configuration} >
      <div className="App">
        <Router>
        <RouteList />
        </Router>
      </div>
    </OidcProvider>
  );
}

export default App;
