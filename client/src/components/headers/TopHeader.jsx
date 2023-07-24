import React, { memo, useEffect } from 'react';
import icons from 'ultils/icons';
import { Link } from 'react-router-dom';
import path from 'ultils/path';
import { getCurrent } from 'store/user/asyncActions';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'store/user/userSlice';

const { FaFacebookF, AiOutlineTwitter, FaInstagram, BsGoogle, BsPinterest, RiLogoutBoxLine } = icons;
const iconArray = [FaFacebookF, AiOutlineTwitter, FaInstagram, BsGoogle, BsPinterest];

const TopHeader = () => {
    const dispatch = useDispatch();
    const { isLoggedIn, current } = useSelector((state) => state.user);
    useEffect(() => {
        const setTimeOutId = setTimeout(() => {
            if (isLoggedIn) dispatch(getCurrent());
        }, 100);
        return () => {
            clearTimeout(setTimeOutId);
        };
    }, [dispatch, isLoggedIn]);
    return (
        <div className='w-full h-[38px] bg-hovermain flex items-center justify-center'>
            <div className='w-main flex items-center justify-between text-white text-[12px]'>
                <div className='flex items-center justify-start gap-4 '>
                    {iconArray?.map((Icon, index) => (
                        <div key={index} className={` pr-3 ${index === iconArray.length - 1 ? '' : 'border-r'}`}>
                            <Icon
                                size={15}
                                className='transition duration-300 transform hover:scale-110 hover:text-gray-800 cursor-pointer '
                            />
                        </div>
                    ))}
                </div>
                <div className='flex items-center justify-center gap-4 cursor-pointer'>
                    {isLoggedIn ? (
                        <div className='flex gap-4 items-center justify-center'>
                            <span className='text-[14px]'>{`Wellcome, ${current?.lastname} ${current?.firstname}`}</span>
                            <span
                                onClick={() => dispatch(logout())}
                                className='hover:text-black transition duration-300 transform'
                            >
                                <RiLogoutBoxLine size={24} />
                            </span>
                        </div>
                    ) : (
                        <Link
                            to={`${path.LOGIN}`}
                            className='hover:text-gray-800 transition duration-300 transform font-normal text-[14px]'
                        >
                            Sign In or Create Account
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default memo(TopHeader);
