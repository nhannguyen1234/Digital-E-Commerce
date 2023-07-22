import React, { memo } from 'react';
import avatar from '../assets/avatarDefault.png';
import { formatStarFromNumber } from '../ultils/helperFn';
import moment from 'moment';
const Comment = ({ image = avatar, updatedAt, comment, star, postedBy }) => {
    return (
        <div className='flex flex-col gap-2 w-full px-10'>
            <div className='flex items-center justify-between text-sm '>
                <div className='flex gap-4 items-center justify-center'>
                    <img src={image} alt='avatar' className='w-6 h-6 object-cover' />
                    <span className='text-[#4a4a4a] font-semibold'>
                        {`${postedBy?.firstname} ${postedBy?.lastname}` || 'User'}
                    </span>
                </div>
                <span className='text-[#707070] italic font-medium'>{moment(updatedAt)?.format('L LT')}</span>
            </div>
            <div className='flex flex-col justify-start p-4 ml-8 gap-2 bg-[#f3f4f6] rounded-md'>
                <div className='flex gap-2 items-center'>
                    <span className='text-sm font-semibold text-[#363636]'>Ratings:</span>
                    <span className='flex items-center'>
                        {formatStarFromNumber(star, 14)?.map((el, index) => (
                            <span key={index}>{el}</span>
                        ))}
                    </span>
                </div>
                <div className='flex gap-2 '>
                    <span className='text-sm font-semibold text-[#363636]'>Review:</span>
                    <span className='text-sm text-[#4a4a4a]'>{comment}</span>
                </div>
            </div>
        </div>
    );
};

export default memo(Comment);
