import React, { useEffect, useState } from 'react';
import { apiGetProducts } from '../apis/product';
import { Product } from './';
import Slider from 'react-slick';
const tabs = [
    { id: 1, name: 'best sellers' },
    { id: 2, name: 'new arrivals' },
];
var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
};
const BestSeller = () => {
    const [bestSeller, setBestSeller] = useState(null);
    const [newArrivals, setNewArrivals] = useState(null);
    const [isActive, setIsActive] = useState(1);
    const [products, setProducts] = useState(null);
    const fetchProducts = async () => {
        const response = await Promise.all([apiGetProducts({ sort: '-sold' }), apiGetProducts({ sort: '-createAt' })]);
        if (response[0]?.success) {
            setBestSeller(response[0].products);
            setProducts(response[0].products);
        }
        if (response[1]?.success) {
            setNewArrivals(response[1].products);
        }
        setProducts(response[0].products);
    };
    useEffect(() => {
        fetchProducts();
    }, []);
    useEffect(() => {
        if (isActive === 1) setProducts(bestSeller);
        if (isActive === 2) setProducts(newArrivals);
    }, [isActive]);
    return (
        <>
            <div className='flex text-[20px] gap-8 pb-4 border-b-2 border-hovermain'>
                {tabs.map((el) => (
                    <span
                        key={el.id}
                        className={`font-semibold text-[20px] uppercase border-r cursor-pointer pr-6 text-gray-500 ${
                            isActive === el.id ? 'text-gray-900' : ''
                        }`}
                        onClick={() => setIsActive(el.id)}
                    >
                        {el.name}
                    </span>
                ))}
            </div>
            <div className='mt-2 mx-[-10px]'>
                <Slider {...settings}>
                    {products?.map((el) => (
                        <Product key={el.id} productData={el} isNew={isActive === 1 ? false : true} />
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
