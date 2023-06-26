import React from 'react'
// import Landing from "./pages/Landing"
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'

import {Error, Landing, Register} from './pages'
// import { AddJob, AllJobs, Stats, Profile } from './pages/dashboard';
import  AddJob  from './pages/dashboard/AddJob.js';
import  AllJobs  from './pages/dashboard/AllJobs.js';
import Profile from './pages/dashboard/Profile.js';
import  Stats from './pages/dashboard/Stats.js';
import  SharedLayout from './pages/dashboard/SharedLayout.js';

import ProtectedRoute from './pages/ProtectedRoute.js';


function App() {
  return (
    <>
    <BrowserRouter>
    
     {/* <nav>
      <Link to="/">Dashboard</Link>
      <Link to="/register">Register</Link>
      <Link to="/landing"> Landing Page</Link>
     </nav> */}



    <Routes>

    

    <Route path='/' element={
     <ProtectedRoute>
    <SharedLayout/>
    </ProtectedRoute>
    }>
      <Route path='all-jobs' element={<AllJobs/>}/>
      <Route path='add-job' element={<AddJob/>}/>
      <Route index element={<Stats/>}/> {/*to make the stats page a default page, that when we search for only '/' this, something must be shown therefore we will show th stats page as default*/}
      <Route path='profile' element={<Profile/>}/>
    </Route>

   

    <Route path='/register' element={<Register/>}/>

    <Route path='/landing' element={ <Landing/>}/>

    <Route path='*' element={<Error/>}/>

   

    </Routes>
    </BrowserRouter>
    
    
     
    </>
  );
}

export default App;
