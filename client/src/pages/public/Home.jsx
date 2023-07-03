import React from 'react';
import { Banner, Sidebar, BestSeller, DailyDeals } from '../../components';

const Home = () => {
    return (
        <>
            <div className='w-main flex'>
                <div className='flex flex-col w-[25%] gap-5 flex-auto '>
                    <Sidebar />
                    <DailyDeals />
                </div>
                <div className='flex flex-col w-[75%] gap-5 flex-auto pl-5 '>
                    <Banner />
                    <BestSeller />
                </div>
            </div>
            <div className='w-full h-[500px]'></div>
        </>
    );
};

export default Home;
