import React from 'react';
import { Banner, Sidebar, BestSeller, DailyDeals, FeaturedProd, NewArrivals, HotCollection } from 'components';

const Home = () => {
    return (
        <>
            <div className='w-main flex mt-6'>
                <div className='flex flex-col w-[25%] gap-5 flex-auto '>
                    <Sidebar />
                    <DailyDeals />
                </div>
                <div className='flex flex-col w-[75%] gap-5 flex-auto pl-5 '>
                    <Banner />
                    <BestSeller />
                </div>
            </div>
            <div className='w-main my-4'>
                <FeaturedProd />
            </div>
            <div className='w-main my-4'>
                <NewArrivals />
            </div>
            <div className='w-main my-4'>
                <HotCollection />
            </div>
        </>
    );
};

export default Home;
