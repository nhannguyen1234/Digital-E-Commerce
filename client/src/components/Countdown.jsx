import React, { memo } from 'react';

const Countdown = ({ unit, number }) => {
    return (
        <div className='w-[28%] h-[66px] flex flex-col bg-[#f4f4f4] items-center justify-center gap-1'>
            <span className='text-[18px] font-semibold leading-5 text-gray-700'>{number}</span>
            <span className='text-[#8b8b8b] text-[12px] '>{unit}</span>
        </div>
    );
};

export default memo(Countdown);
