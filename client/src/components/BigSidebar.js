import React from 'react'
import Wrapper from "../assets/wrappers/BigSidebar"
import { useAppContext } from '../context/appContext'
import Logo from './Logo'
import NavLinks from './NavLinks'
import { initialState } from '../context/appContext'

export default function BigSidebar() {
  //  const { showSideBar } = useAppContext()
  const { showSidebar, toggleSidebar }  = useAppContext()
  return (
    <>
    
    <Wrapper>

    <div  className={(showSidebar) ? 'sidebar-container ' : 'sidebar-container show-sidebar'}  >

     <div className="content">

      <header><Logo/></header>
      <NavLinks/>

     </div>

    </div>

    </Wrapper>
    
    
    
    </>

  )
}
