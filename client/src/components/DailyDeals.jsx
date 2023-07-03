import React, { memo, useEffect, useState } from 'react';
import { apiGetProducts } from '../apis/product';
import icons from '../ultils/icons';
import { formatPrice, formatStarFromNumber, formatTimes } from '../ultils/helperFn';
import Countdown from './Countdown';
import moment from 'moment';
const { AiFillStar, HiMenu } = icons;
let idInterval;
const DailyDeals = () => {
    const [dailyDeals, setdailyDeal] = useState(null);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [expire, setExpire] = useState(false);
    const fetchDailyDeal = async () => {
        const response = await apiGetProducts({ limit: 1, page: Math.round(Math.random() * 10), totalRatings: 5 });
        if (response.success) {
            setdailyDeal(response.products[0]);
            const today = moment().format('MM/DD/YY') + ' 0:00:00';
            const seconds = new Date(today).getTime() - new Date().getTime() + 24 * 60 * 60 * 1000;
            const number = formatTimes(seconds);
            setHour(number.h);
            setMinute(number.m);
            setSecond(number.s);
        } else {
            setHour(0);
            setMinute(59);
            setSecond(60);
        }
    };

    useEffect(() => {
        clearInterval(idInterval);
        fetchDailyDeal();
    }, [expire]);
    useEffect(() => {
        idInterval = setInterval(() => {
            if (second > 0) {
                setSecond((prev) => prev - 1);
            } else {
                if (minute > 0) {
                    setSecond(60);
                    setMinute((prev) => prev - 1);
                } else {
                    if (hour > 0) {
                        setHour((prev) => prev - 1);
                        setMinute(59);
                        setSecond(60);
                    } else {
                        setExpire(!expire);
                    }
                }
            }
        }, 1000);
        return () => {
            clearInterval(idInterval);
        };
    }, [second, minute, hour, expire]);

    return (
        <div className='border w-full flex-auto items-center justify-between'>
            <div className='flex p-4 items-center justify-between'>
                <span className='flex-1 flex justify-center'>
                    <AiFillStar size={22} color='#d11' />
                </span>
                <span className='flex-8 flex justify-center font-semibold text-gray-700 text-[20px]'>DAILY DEALS</span>
                <span className='flex-1'></span>
            </div>
            <div className='flex flex-col pt-2 gap-2 w-full items-center'>
                <img
                    src={dailyDeals?.thumb || 'https://www.glfl.com.sa/items/attimgs/6v3u2a9d3m.jpg'}
                    alt='product-img'
                    className='w-full object-contain'
                />
                <span className='line-clamp-1 leading-4 pt-4 cursor-pointer hover:text-hovermain'>
                    {dailyDeals?.title}
                </span>
                <span className='flex h-4'>{formatStarFromNumber(dailyDeals?.totalRatings, 20)}</span>
                <span className='leading-4 pt-3'>{`${formatPrice(dailyDeals?.price)} VND`}</span>
            </div>
            <div className='px-4 mt-4'>
                <div className='flex gap-2 justify-center items-center my-4'>
                    <Countdown unit={'Hours'} number={hour} />
                    <Countdown unit={'Minutes'} number={minute} />
                    <Countdown unit={'Seconds'} number={second} />
                </div>
                <button
                    type='button'
                    className='flex items-center justify-center gap-2 w-full bg-hovermain text-white hover:bg-gray-800 py-2 font-normal'
                >
                    <HiMenu size={18} />
                    <span>OPTIONS</span>
                </button>
            </div>
        </div>
    );
};

export default memo(DailyDeals);
