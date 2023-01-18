export const environment = {
  production: false,
  SIGNALR_PUSHHUB_URL: 'https://test-signal.softrig.com/pushHub',
  base_url: 'https://test.softrig.com/api',
  authority: 'https://test-login.softrig.com',
  client_id: '10a6d258-715e-45e1-826e-e7cb3f0c2958',
  redirect_uri: 'http://localhost:4200',
  post_logout_redirect_uri: 'http://localhost:4200',
  silent_redirect_uri: 'http://localhost:4200/silent-renew.html',
  automaticSilentRenew: true,
  response_type: 'code',
  scope: 'openid profile AppFramework',
  loadUserInfo: false,
  filterProtocolClaims: true, // prevents protocol level claims such as nbf, iss, at_hash, and nonce from being extracted from the identity token as profile dataloadUserInfo: true
};