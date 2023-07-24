import React, { memo, useEffect, useRef } from 'react';
import { AiFillStar } from 'react-icons/ai';

const Votebar = ({ number, ratingsCount, totalRatings }) => {
    const percentRef = useRef();
    useEffect(() => {
        const percent = Math.round((ratingsCount / totalRatings) * 100) || 0;
        percentRef.current.style.cssText = `right: ${100 - percent}%`;
    }, [ratingsCount, totalRatings]);
    return (
        <div className='flex gap-2 text-sm '>
            <div className='flex w-[5%] items-center justify-center gap-1'>
                <span className='font-semibold'>{number}</span>
                <AiFillStar color='orange' size={16} />
            </div>
            <div className='w-[75%] flex flex-col justify-center'>
                <div className='w-full relative h-[6px] bg-gray-200 rounded-r-full rounded-l-full'>
                    <div ref={percentRef} className='absolute bg-red-500 inset-0 rounded-r-full rounded-l-full'></div>
                </div>
            </div>
            <div className='w-[20%] pl-4'>{`${ratingsCount || 0} reviewers`}</div>
        </div>
    );
};

export default memo(Votebar);
