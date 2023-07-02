import React from 'react'
import { navigation } from '../ultils/constants'
import {NavLink} from 'react-router-dom'
const Navigation = () => {
  return (
    <div className='w-main h-[48px] py-2 flex items-center text-sm border-b mb-5'>
{navigation.map(el=>(
  <NavLink
  to={el.path}
  key={el.id}
  className={({isActive}) => 
    isActive ? 'pr-12 hover:text-hovermain text-hovermain' : 'pr-12 hover:text-hovermain'
  }
  >
    {el.value}
  </NavLink>
))}
    </div>
  )
}

export default Navigation