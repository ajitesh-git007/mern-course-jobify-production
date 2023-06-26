import React from 'react'
import Wrapper from '../assets/wrappers/SmallSidebar'
import { FaTimes } from 'react-icons/fa'
import { useAppContext } from '../context/appContext'
import Links from '../utils/links.js'
import { NavLink } from 'react-router-dom'
import Logo from '../components/Logo.js'
import { useState } from 'react'
import NavLinks from './NavLinks.js'
// import { toggleSidebar } from 

export default function SmallSidebar() {
  
  // const [showSidebar, setShowSidebar] = useState(false)


  const { showSidebar, toggleSidebar }  = useAppContext()

  return (

    <>
    
    <Wrapper>

    <div className= {(showSidebar) ? "sidebar-container " : "sidebar-container show-sidebar"}>
     <div className="content">

     <button type='button' className='close-btn' onClick={toggleSidebar}> <FaTimes/>   </button>
      
     <header>
      <Logo/>
      </header> 

      

     <NavLinks toggleSidebar={toggleSidebar}/>
     </div>

    </div>

    </Wrapper>
    
    
    
    </>
  )
}
