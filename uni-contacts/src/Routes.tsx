import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './containers/home'
import Contacts from './containers/contacts'
import { Navbar } from './components/navbar'

const RouteList = () => {
  return (
      <div>
        <Navbar/>
        <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/Contacts" element={<Contacts />} />
        </Routes>
      </div>
  )
}

export default RouteList