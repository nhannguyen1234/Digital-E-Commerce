import React, { useState } from 'react';
import { formatPrice, formatStarFromNumber } from '../ultils/helperFn';
import SelectOption from './SelectOption';
import icons from '../ultils/icons';
import { Link } from 'react-router-dom';

const { FaHeart, FaEye, HiMenu } = icons;
const NAProduct = ({ productData, isHome }) => {
    const [showOption, setShowOption] = useState(false);
    return (
        <Link to={`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`}>
            <div
                onMouseEnter={(e) => {
                    e.stopPropagation();
                    setShowOption(true);
                }}
                onMouseLeave={(e) => {
                    e.stopPropagation();
                    setShowOption(false);
                }}
                className={` text-base px-2 py-4 ${isHome ? 'h-[484px] w-full' : 'h-[420px] w-[304px]'}`}
            >
                <div className='w-full h-full border shadow-md rounded-md flex flex-col items-center'>
                    <div className='w-full relative'>
                        {showOption && (
                            <div className='w-full h-full absolute bg-white animate-fade-in '>
                                <div className='flex flex-col'>
                                    <div className='flex justify-between items-center border-b-2 p-2 '>
                                        <span className=' leading-4 p-1 cursor-pointer hover:text-hovermain truncate'>
                                            {productData?.title}
                                        </span>
                                        <span className='flex-shrink-0'>{`${formatPrice(
                                            productData?.price,
                                        )} VND`}</span>
                                    </div>
                                    <div
                                        className={`flex flex-col gap-1 justify-start  text-gray-500 ${
                                            isHome ? 'p-4' : ' p-4 text-[13px]'
                                        }`}
                                    >
                                        {productData?.description.map((el, index) => (
                                            <span key={index}>{el}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className='absolute bottom-[-60px] left-0 right-0 flex items-center justify-center gap-3 animate-slide-top'>
                                    <SelectOption icon={<FaHeart size={18} />} />
                                    <SelectOption icon={<HiMenu size={18} />} />
                                    <SelectOption icon={<FaEye size={18} />} />
                                </div>
                            </div>
                        )}
                        <img
                            src={productData?.thumb || 'https://www.glfl.com.sa/items/attimgs/6v3u2a9d3m.jpg'}
                            alt='product-img'
                            className={`w-full object-contain ${isHome ? 'h-[346px] py-4' : 'h-[248px] py-2'}`}
                        />
                    </div>
                    {!showOption && (
                        <div
                            className={`flex flex-col items-start gap-1  w-full mb-4 ${
                                isHome ? 'ml-10 text-[16px]' : 'p-6 text-sm'
                            }`}
                        >
                            <span className='line-clamp-1 leading-4 p-1 capitalize cursor-pointer hover:text-hovermain'>
                                {productData?.title}
                            </span>
                            <span className='flex mt-2'>
                                {formatStarFromNumber(productData?.totalRatings, 15)?.map((el, index) => (
                                    <span key={index}>{el}</span>
                                ))}
                            </span>
                            <span className='leading-4 mt-2'>{`${formatPrice(productData?.price)} VND`}</span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default NAProduct;
