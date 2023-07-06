import React, { useEffect, useState } from 'react';
import { Product } from './';
import { getBestSellerProduct, getNewProducts } from '../store/product/asyncActions';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import settings from '../ultils/settingSlide';
const tabs = [
    { id: 1, name: 'best sellers' },
    { id: 2, name: 'new arrivals' },
];

const BestSeller = () => {
    const [isActive, setIsActive] = useState(1);
    const dispatch = useDispatch();
    const { newProducts, bestSellerProducts } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getBestSellerProduct());
        dispatch(getNewProducts());
    }, [dispatch]);
    const products = isActive === 1 ? bestSellerProducts : newProducts;
    return (
        <>
            <div className='flex text-[20px] gap-8 pb-4 border-b-2 border-hovermain'>
                {tabs.map((el) => (
                    <span
                        key={el.id}
                        className={`font-semibold text-[20px] uppercase  cursor-pointer pr-6 text-gray-500 ${
                            isActive === el.id ? 'text-gray-900' : ''
                        } ${el.id === 2 ? '' : 'border-r'}`}
                        onClick={() => setIsActive(el.id)}
                    >
                        {el.name}
                    </span>
                ))}
            </div>
            <div className='mt-2 mx-[-10px]'>
                <Slider {...settings}>
                    {products?.map((el) => (
                        <Product key={el._id} productData={el} isNew={isActive === 1 ? false : true} />
                    ))}
                </Slider>
            </div>
            <div className='w-full flex gap-5 '>
                <img
                    className='flex-1 object-contain cursor-pointer'
                    src='https://cdn.shopify.com/s/files/1/1903/4853/files/banner2-home2_2000x_crop_center.png?v=1613166657'
                    alt='banner-img'
                />
                <img
                    className='flex-1 object-contain cursor-pointer'
                    src='https://cdn.shopify.com/s/files/1/1903/4853/files/banner1-home2_2000x_crop_center.png?v=1613166657'
                    alt='banner-img'
                />
            </div>
        </>
    );
};

export default BestSeller;
