import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Login from './components/Login';
import HomePagos from './components/HomePlanes';
import ErrorBoundary from './components/ErrorBoundary';
import FreeDashboard from './components/PlanFree/Dashboard'

function App() {

  return (
    <>
      <Toaster />
      <ErrorBoundary>
     <Router>
      <Routes>
       <Route path='/' element={<Login/>}/> 
       <Route path='/pagos' element ={<HomePagos/>}/>
       <Route path='/dashboardfree' element={<FreeDashboard/>}/>
      </Routes>
     </Router>
      </ErrorBoundary>
    </>
  )
}

export default App
