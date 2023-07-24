import React from 'react';
import { Link } from 'react-router-dom';

import { formatPrice, formatStarFromNumber } from '../../ultils/helperFn';

const ProductCard = ({ thumb, title, totalRatings, price, id, category }) => {
    return (
        <Link to={`/${category.toLowerCase()}/${id}/${title}`} className='w-1/3 flex-auto flex px-[10px] mb-5 h-40'>
            <div className='flex w-full border gap-4 rounded-md shadow-md '>
                <img src={thumb} alt='product-card' className='w-[90px] object-contain mx-4' />
                <div className='flex flex-col mt-10 items-start gap-1 w-full text-sm'>
                    <span className='line-clamp-1 leading-4 p-1 capitalize cursor-pointer hover:text-hovermain text-[16px]'>
                        {title.toLowerCase()}
                    </span>
                    <span className='flex mt-2'>
                        {formatStarFromNumber(totalRatings, 15)?.map((el, index) => (
                            <span key={index}>{el}</span>
                        ))}
                    </span>
                    <span className='leading-4 mt-2 text-[#333]'>{`${formatPrice(price)} VND`}</span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
