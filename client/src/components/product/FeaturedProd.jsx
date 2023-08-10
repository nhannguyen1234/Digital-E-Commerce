import React, { useEffect, useState } from 'react';
import ProductCard from '../slider/ProductCard';
import { apiGetProducts } from 'apis/product';
const FeaturedProd = () => {
    const [featureProduct, setFeaturedProduct] = useState(null);
    const fetchFeatureProduct = async () => {
        const response = await apiGetProducts({ limit: 9, totalRatings: 5 });
        if (response.success) setFeaturedProduct(response.products);
    };
    useEffect(() => {
        fetchFeatureProduct();
    }, []);
    return (
        <div className='w-full'>
            <div className='border-b-2 border-b-red-600 font-semibold pt-4 pb-3 text-[20px]'>FEATURED PRODUCTS</div>
            <div className='flex flex-wrap mx-[-10px] mt-5'>
                {featureProduct?.map((el) => (
                    <ProductCard key={el._id} thumb={el.thumb} title={el.title} totalRatings={el.totalRatings} price={el.price} id={el._id} category={el.category} />
                ))}
            </div>
            <div className='flex justify-between gap-5'>
                <img
                    src='https://cdn.shopify.com/s/files/1/1903/4853/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661'
                    alt=''
                    className='flex-2'
                />
                <div className='flex flex-col justify-between flex-1'>
                    <img src='https://cdn.shopify.com/s/files/1/1903/4853/files/banner2-bottom-home2_400x.jpg?v=1613166661' alt='' />
                    <img src='https://cdn.shopify.com/s/files/1/1903/4853/files/banner3-bottom-home2_400x.jpg?v=1613166661' alt='' />
                </div>
                <img
                    src='https://cdn.shopify.com/s/files/1/1903/4853/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661'
                    alt=''
                    className='flex-1'
                />
            </div>
        </div>
    );
};

export default FeaturedProd;
