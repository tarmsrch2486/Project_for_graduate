import { useState, useEffect } from "react"
import './app.css'


//Components
import Sidebar from "./components/Sidebar"
import Navbar_admin from "./components/Navbar_admin"
import Content_admin from "./components/Content_admin"
import Footer_admin from "./components/Footer_admin"
import User_info from "./Pages/User_info"
import Login_admin from './Pages/Login_admin.jsx'
import Edit_user_info from "./Pages/Edit_user_info"
import Waiting_for_payment from "./Pages/Waiting_for_payment"
import User_score from "./Pages/User_score"
import Edit_score from "./Pages/Edit_score"
import Certifi_rp from "./Pages/Certifi_rp"

//Router
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={< Login_admin />}></Route>
        <Route path='/' element={< Login_admin />}></Route>
        <Route path='/dashboard' element={< Content_admin />}></Route>
        <Route path="/user_info" element={< User_info />}> </Route>
        <Route path="/edit_user_info/:id" element={< Edit_user_info />}> </Route>
        <Route path="/waiting_for_payment" element={< Waiting_for_payment />}> </Route>
        <Route path="/user_score" element={< User_score />}> </Route>
        <Route path="/edit_score/:id" element={< Edit_score />}> </Route>
        <Route path="/certifi_rp" element={< Certifi_rp />}> </Route>
        
      </Routes>



    </BrowserRouter>
  )
}

export default App
