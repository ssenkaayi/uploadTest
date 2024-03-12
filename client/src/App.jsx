import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import PrivateRoutes from './components/PrivateRoutes'
import Dashbord from './pages/LayOut'
import Profile from './pages/Profile'
import Employes from './pages/Employes'
import Payments from './pages/Payments'
import Settings from './pages/Settings'
import Trips from './pages/Trips'
import Suppliers from './pages/Suppliers'
import Clients from './pages/Clients'
import LayOut from './pages/LayOut'
import ViewClientDetails from './pages/ViewClientDetails'
import ViewSupplierDetails from './pages/ViewSupplierDetails'
import ViewTripDetails from './pages/ViewTripDetails'
import Search from './pages/Search'






export default function App() {

 

  return (

    <BrowserRouter>

      <Routes>

        <Route element={<PrivateRoutes/>}>

          <Route path="/" element={<LayOut/>} >

            <Route path='/'   element = {<Clients/>}/>
            <Route path='profile'  element = {<Profile/>}/>
            <Route path='employes' element = {<Employes/>}/>
            <Route path='suppliers' element = {<Suppliers/>}/>
            <Route path='payments' element = {<Payments/>}/>
            <Route path='trips' element = {<Trips/>}/>
            <Route path='settings' element = {<Settings/>}/>
            <Route path='view_client/:id' element = {<ViewClientDetails/>}/>
            <Route path='view_supplier/:id' element = {<ViewSupplierDetails/>}/>
            <Route path='view_trip/:id' element = {<ViewTripDetails/>}/>
            <Route path='search' element = {<Search/>}/>


            

          </Route>

        </Route>

        <Route path="/login" element={<Login/>}/>

      </Routes>
    </BrowserRouter>
  )
}
 