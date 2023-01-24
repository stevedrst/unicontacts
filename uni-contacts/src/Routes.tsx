import React, { useEffect } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './containers/home'
import Contacts from './containers/contacts'
import { Navbar } from './components/navbar'
import { useOidcAccessToken } from '@axa-fr/react-oidc'
import Create from './containers/create'
import View from './containers/view'

const RouteList = () => {

  const { accessToken } = useOidcAccessToken();

  useEffect(() => localStorage.setItem("token", accessToken), [accessToken]);

  return (
      <div>
        <Navbar/>
        
        <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/Contacts" element={<Contacts />} />
            <Route path="/Create" element={<Create />} />
            <Route path="/View" element={<View />} />
        </Routes>
      </div>
  )
}

export default RouteList