import React, { memo } from 'react';
import icons from '../ultils/icons';
import { Link } from 'react-router-dom';
import path from '../ultils/path';
const TopHeader = () => {
    const { FaFacebookF, AiOutlineTwitter, FaInstagram, BsGoogle, BsPinterest } = icons;
    const iconArray = [FaFacebookF, AiOutlineTwitter, FaInstagram, BsGoogle, BsPinterest];
    return (
        <div className='w-full h-[38px] bg-hovermain flex items-center justify-center'>
            <div className='w-main flex items-center justify-between text-white text-[12px]'>
                <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
                <div className='flex items-center justify-center gap-4 cursor-pointer'>
                    <Link
                        to={`${path.LOGIN}`}
                        className='hover:text-gray-800 transition duration-300 transform font-normal'
                    >
                        Sign In or Create Account
                    </Link>
                    <div className='flex items-center justify-center gap-4 '>
                        {iconArray?.map((Icon, index) => (
                            <div key={index} className='border-l pl-3'>
                                <Icon
                                    size={15}
                                    className='transition duration-300 transform hover:scale-110 hover:text-gray-800  '
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(TopHeader);
