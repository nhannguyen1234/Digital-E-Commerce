import React, { useCallback, useEffect, useState } from 'react';
import { createSearchParams, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Breadcrumbs, SearchItem, InputSelect } from '../../components';
import { apiGetProducts } from '../../apis';
import NAProduct from '../../components/NAProduct';
import { sorts } from '../../ultils/constants';

const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState(null);
    const [isActiveClick, setIsActiveClick] = useState(null);
    const [sort, setSort] = useState('');
    const [params] = useSearchParams();
    const { category } = useParams();
    // const fetchProductByCategory = async () => {
    //     const response = await apiGetProducts({ category});
    //     console.log(response);
    //     if (response.success) setProducts(response?.products);
    // };
    const fetchProductsByFilter = async (queries) => {
        const response = await apiGetProducts(queries);
        if (response.success) setProducts(response.products);
    };
    // useEffect(() => {
    //     fetchProductByCategory();
    // }, [category]);
    useEffect(() => {
        let param = [];
        for (let i of params.entries()) param.push(i);
        let queries = {};
        for (let i of params) queries = { [i[0]]: i[1] };
        let priceQuery = {};
        if (queries.from && queries.to) {
            priceQuery = {
                $and: [{ price: { gte: queries.from } }, { price: { lte: queries.to } }],
            };
            delete queries.price;
        }
        if (queries.from) queries.price = { gte: queries.from };
        if (queries.to) queries.price = { lte: queries.to };
        delete queries.to;
        delete queries.from;
        const q = { ...priceQuery, ...queries };
        fetchProductsByFilter(q);
    }, [params]);
    const handleChangeFilter = useCallback(
        (name) => {
            if (isActiveClick === name) setIsActiveClick(null);
            else setIsActiveClick(name);
        },
        [isActiveClick],
    );
    const changeValue = useCallback(
        (value) => {
            setSort(value);
        },
        [sort],
    );
    useEffect(() => {
        navigate({
            pathname: `/${category}`,
            search: createSearchParams({ sort }).toString(),
        });
    }, [sort]);
    return (
        <div className='w-full flex flex-col items-center justify-between mt-1'>
            <div className='w-full h-20 bg-[#f7f7f7] flex justify-center items-center'>
                <div className='w-main flex flex-col justify-center text-[14px] gap-2'>
                    <span className='text-[18px] font-semibold uppercase'>{category}</span>
                    <Breadcrumbs category={category} />
                </div>
            </div>
            <div className='w-main border shadow-md rounded-md flex justify-between p-4 mt-8 m-auto'>
                <div className='flex flex-col gap-3'>
                    <span className='font-semibold text-sm text-[#505050]'>Filter by</span>
                    <div className='w-[78%] flex-auto flex items-center gap-4'>
                        <SearchItem
                            name='price'
                            isActiveClick={isActiveClick}
                            handleChangeFilter={handleChangeFilter}
                            type='input'
                        />
                        <SearchItem
                            name='color'
                            isActiveClick={isActiveClick}
                            handleChangeFilter={handleChangeFilter}
                            type='checkbox'
                        />
                    </div>
                </div>
                <div className='w-[22%] flex flex-col gap-3'>
                    <span className='font-semibold text-sm text-[#505050]'>Sort by</span>
                    <div className='w-full'>
                        <InputSelect value={sort} options={sorts} changeValue={changeValue} />
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-4 gap-2 mt-4 mb-8'>
                {products?.map((el) => (
                    <NAProduct key={el._id} productData={el} isHome={false} />
                ))}
            </div>
        </div>
    );
};

export default Products;
