import React from 'react'
import UnAuthenticated from '../errors/UnAuthenticated.js'

// export default function checkPermissions(requestUser, resourceUserId) {
  
//          if(requestUser === resourceUserId) return

         
//           throw new UnAuthenticated("Not authorised access to this route")

  
  
// }

// import { UnAuthenticatedError } from '../errors/index.js'

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) return

  throw new UnAuthenticated('Not authorized to access this route')
}

export default checkPermissions
