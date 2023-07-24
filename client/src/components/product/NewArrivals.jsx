import React, { memo, useEffect, useState } from 'react';
import { getTabletProduct, getSmartphoneProduct, getLaptopProduct } from 'store/product/asyncActions';
import { NAProduct } from '..';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import settings from 'ultils/settingSlide';
const tabs = [
    {
        id: 1,
        name: 'smartphone',
    },
    {
        id: 2,
        name: 'tablet',
    },
    {
        id: 3,
        name: 'laptop',
    },
];
const NewArrivals = () => {
    const [isActive, setIsActive] = useState(1);
    const [products, setProducts] = useState(null);
    const dispatch = useDispatch();
    const { tablet, laptop, phone } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getSmartphoneProduct());
        dispatch(getTabletProduct());
        dispatch(getLaptopProduct());
    }, [dispatch]);
    useEffect(() => {
        if (isActive === 1) setProducts(phone);
        if (isActive === 2) setProducts(tablet);
        if (isActive === 3) setProducts(laptop);
    }, [isActive, phone, tablet, laptop]);
    return (
        <>
            <div className='flex justify-between border-b-2 border-b-red-600 pb-2 pt-4'>
                <div className=' font-semibold  text-[20px] w-full flex items-center justify-start '>NEW ARRIVALS</div>
                <div className='flex flex-end gap-5 text-gray-500 items-center justify-center'>
                    {tabs.map((el) => (
                        <span
                            key={el.id}
                            className={`capitalize text-[15px] pl-5 cursor-pointer hover:text-hovermain ${
                                isActive === el.id ? 'text-red-600' : ''
                            } ${el.id === 1 ? '' : 'border-l-2'}`}
                            onClick={() => setIsActive(el.id)}
                        >
                            {el.name}
                        </span>
                    ))}
                </div>
            </div>
            <div className='w-full mt-2'>
                <Slider {...settings}>
                    {products?.map((el) => (
                        <NAProduct key={el._id} productData={el} isHome={true} />
                    ))}
                </Slider>
            </div>
        </>
    );
};

export default memo(NewArrivals);
