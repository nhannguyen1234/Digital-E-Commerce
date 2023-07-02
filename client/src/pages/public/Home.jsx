import React from 'react'
import {Banner,Sidebar}  from '../../components'
const Home = () => {
  return (
    <div className='w-main flex'>
      <div className='flex flex-col w-[25%] gap-5 flex-auto '>
        <Sidebar/>
        <span>Daily Deals</span>
      </div>
      <div className='flex flex-col w-[75%] gap-5 flex-auto pl-5 '>
        <Banner/>
        <span>Best Seller</span>
      </div>
    </div>
  )
}

export default Home