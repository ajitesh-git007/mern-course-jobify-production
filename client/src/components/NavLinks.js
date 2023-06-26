import React from 'react'
import Links from '../utils/links.js'
import { useAppContext } from '../context/appContext'

import { NavLink } from 'react-router-dom'

export default function NavLinks({toggleSidebar}) {

    const { showSidebar}  = useAppContext()

  return (
    <div className="nav-links">
        
        {Links.map((link) => {
          const {id, text, path, icon} = link
          return <NavLink to={path} key = {id} onClick = {toggleSidebar} className={({isActive})=> isActive ? 'nav-link active' : 'nav-link'}>

            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        })}
        
      </div>
  )
}
