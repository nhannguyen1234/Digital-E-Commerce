import React from 'react'
import {Outlet} from 'react-router-dom'
import {Header,Navigation} from '../../components'
const Accessible = () => {
  return (
    <div className='w-full flex flex-col items-center'>
        <Header/>
        <Navigation/>
      <div className='w-main'>
      <Outlet/>
      </div>
    </div>
  )
}

export default Accessible