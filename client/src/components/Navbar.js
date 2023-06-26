import React from 'react'
import Wrapper from '../assets/wrappers/Navbar'

import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useAppContext } from '../context/appContext.js'
import Logo from './Logo'
import { useState  } from 'react'

import { initialState } from '../context/appContext.js'
// import { useAppContext } from '../../context/appContext.js'

export default function Navbar() {

  const { user } = useAppContext()

  const[showLogout, setShowLogout] = useState(false)
 
 const {toggleSidebar, logoutUser} = useAppContext()



//  const { user } = initialState
 
  return (
    <>
    
    <Wrapper>

     <div className="nav-center">
      <button type='button' className='toggle-btn' onClick={toggleSidebar}> <FaAlignLeft/>   </button>
   
      <div>
        <Logo/>
        <h3 className="logo-text">dashboard</h3>
      </div>

      <div className="btn-container" type='button'>
      <button type='button' className='btn'  onClick={()=>{setShowLogout(!showLogout)}}> <FaUserCircle/> {user && user.name} <FaCaretDown/>   </button>
      <div className={(showLogout) ? "show-dropdown dropdown" : "dropdown"}>  
      <button type='button' className='dropdown-btn' onClick={logoutUser}> logout   </button>

      </div>
      </div>

     </div>
    
    </Wrapper>
    
    </>
  )
}
