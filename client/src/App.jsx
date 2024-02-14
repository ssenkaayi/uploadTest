import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import PrivateRoutes from './components/PrivateRoutes'
import Dashbord from './pages/Dashbord'
import Profile from './pages/Profile'
import Orders from './pages/Orders'
import Employes from './pages/Employes'
import Luggages from './pages/Luggages'
import Payments from './pages/Payments'
import Settings from './pages/Settings'





export default function App() {

 

  return (

    <BrowserRouter>

      <Routes>

        <Route element={<PrivateRoutes/>}>

          <Route path="/dashbord" element={<Dashbord/>} >

            {/* <Route path='' element = {<Dashbord/>}/> */}
            <Route path='/dashbord/profile'  element = {<Profile/>}/>
            <Route path='/dashbord/employes' element = {<Employes/>}/>
            <Route path='/dashbord/luggages' element = {<Luggages/>}/>
            <Route path='/dashbord/payments' element = {<Payments/>}/>
            <Route path='/dashbord/orders'   element = {<Orders/>}/>
            <Route path='/dashbord/settings' element = {<Settings/>}/>

          </Route>

        </Route>

        <Route path="/" element={<Login/>}/>

      </Routes>
    </BrowserRouter>
  )
}
 