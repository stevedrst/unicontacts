import { useOidc, useOidcIdToken } from '@axa-fr/react-oidc'
import React from 'react'


export const Home: React.FunctionComponent = (props) => {

  return (
      <div>
        <h1 style={{margin: "8px"}}>Welcome uni...verse!</h1>
        <p style={{margin:"8px"}}>To view your contacts navigate to Contacts in the bar above!</p>
        <br></br>
        <p style={{margin:"8px"}}>The create tab allows you to create new contacts and the view tab expands on contacts with greater detail.</p>
      </div>
  )
}
export default Home;