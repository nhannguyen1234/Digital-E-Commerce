import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, formatStarFromNumber } from 'ultils/helperFn';
import newLabel from 'assets/new.png';
import trendingLabel from 'assets/trending.png';
import SelectOption from '../search/SelectOption';
import icons from 'ultils/icons';
const { FaHeart, FaEye, HiMenu } = icons;

const Product = ({ productData, isNew }) => {
    const [showOption, setShowOption] = useState(false);

    return (
        <div className='w-full text-base px-2'>
            <Link
                to={`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`}
                onMouseEnter={(e) => {
                    e.stopPropagation();
                    setShowOption(true);
                }}
                onMouseLeave={(e) => {
                    e.stopPropagation();
                    setShowOption(false);
                }}
            >
                <div className='w-full border p-4 flex flex-col items-center'>
                    <div className='w-full relative'>
                        {showOption && (
                            <div className='absolute bottom-0 left-0 right-0 flex items-center justify-center gap-3 animate-slide-top'>
                                <SelectOption icon={<FaHeart size={18} />} />
                                <SelectOption icon={<HiMenu size={18} />} />
                                <SelectOption icon={<FaEye size={18} />} />
                            </div>
                        )}
                        <img
                            src={productData?.thumb || 'https://www.glfl.com.sa/items/attimgs/6v3u2a9d3m.jpg'}
                            alt='product-img'
                            className='w-full h-[243px] object-contain'
                        />
                        <img
                            src={isNew ? newLabel : trendingLabel}
                            alt=''
                            className='absolute top-0 right-0 w-[78px] h-[32px] '
                        />
                    </div>
                    <div className=' flex flex-col items-start mt-6 gap-1 text-[16px] w-full mb-4'>
                        <span className='line-clamp-1 leading-4 p-1 pb-5  capitalize cursor-pointer hover:text-hovermain'>
                            {productData?.title.toLowerCase()}
                        </span>
                        <span className='flex mt-2'>
                            {formatStarFromNumber(productData?.totalRatings, 15)?.map((el, index) => (
                                <span key={index}>{el}</span>
                            ))}
                        </span>
                        <span className='leading-4 mt-2'>{`${formatPrice(productData?.price)} VND`}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Product;
