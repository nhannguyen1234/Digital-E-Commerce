import React, { memo, useEffect, useState } from 'react';
import { useNavigate, useParams, createSearchParams, useSearchParams } from 'react-router-dom';
import icons from 'ultils/icons';
import { color } from 'ultils/constants';
import { apiGetProducts } from 'apis';
import { formatPrice } from 'ultils/helperFn';
import useDebounce from 'hooks/useDebounce';
const { FaCaretDown } = icons;

const SearchItem = ({ name, isActiveClick, handleChangeFilter, type = 'checkbox' }) => {
    const [selected, setSelected] = useState([]);
    const [bestPrice, setBestPrice] = useState(null);
    const [price, setPrice] = useState({
        from: '',
        to: '',
    });
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const { category } = useParams();
    const handleSelect = (e) => {
        const alreadyEl = selected.find((el) => el === e.target.id);
        if (alreadyEl) setSelected((prev) => prev.filter((el) => el !== e.target.value));
        else setSelected((prev) => [...prev, e.target.value]);
    };
    const fetchBestPriceProduct = async () => {
        const response = await apiGetProducts({ sort: '-price', limit: 1 });
        if (response.success) setBestPrice(response.products[0]?.price);
    };
    useEffect(() => {
        if (type === 'input') fetchBestPriceProduct();
    }, [type]);

    useEffect(() => {
        let param = [];
        for (let i of params.entries()) param.push(i);
        const queries = {};
        for (let i of param) queries[i[0]] = i[1];
        if (selected.length > 0) {
            queries.color = selected.join(',');
            queries.page = 1;
        } else delete queries.color;
        navigate({
            pathname: `/${category}`,
            search: createSearchParams(queries).toString(),
        });
    }, [selected, category, navigate, params]);
    const debouncePriceFrom = useDebounce(price.from, 500);
    const debouncePriceTo = useDebounce(price.to, 500);
    useEffect(() => {
        let param = [];
        for (let i of params.entries()) param.push(i);
        const queries = {};
        for (let i of param) queries[i[0]] = i[1];
        if (Number(price.from) > 0) {
            queries.from = price.from;
            queries.page = 1;
        } else delete queries.from;
        if (Number(price.to) > 0) {
            queries.to = price.to;
            queries.page = 1;
        } else delete queries.to;

        navigate({
            pathname: `/${category}`,
            search: createSearchParams(queries).toString(),
        });
    }, [debouncePriceFrom, debouncePriceTo, category, navigate, params, price.to, price.from]);
    return (
        <div
            onClick={() => handleChangeFilter(name)}
            className='relative border rounded-md cursor-pointer border-gray-500 hover:border-gray-900 flex justify-between items-center p-3 gap-6'
        >
            <span className='text-xs text-gray-400 capitalize'>{name}</span>
            <FaCaretDown size={12} />
            {isActiveClick === name && (
                <div className='absolute top-[calc(100%+1px)] left-0 w-fit bg-white min-w-[300px] z-50 border'>
                    {type === 'checkbox' && (
                        <div className='flex flex-col gap-4'>
                            <div className='p-6 border-b items-center flex justify-between gap-8 text-sm'>
                                <span className='whitespace-nowrap'>{`${selected?.length} selected`}</span>
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelected([]);
                                    }}
                                    className='underline cursor-pointer hover:text-hovermain'
                                >
                                    Reset
                                </span>
                            </div>
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className='flex flex-col px-6 py-2 gap-3 cursor-pointer'
                            >
                                {color.map((el, index) => (
                                    <div key={index} className='flex gap-4 items-center'>
                                        <input
                                            type='checkbox'
                                            className=''
                                            value={el}
                                            id={el}
                                            onChange={(e) => handleSelect(e)}
                                            checked={selected.some((selectedITem) => selectedITem === el)}
                                        />
                                        <label className='capitalize text-gray-800 text-sm font-medium' htmlFor={el}>
                                            {el}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {type === 'input' && (
                        <div onClick={(e) => e.stopPropagation()} className='flex flex-col gap-4'>
                            <div className='p-6 border-b items-center flex justify-between gap-8 text-sm'>
                                <span className='whitespace-nowrap'>{`The highest price is ${formatPrice(
                                    bestPrice,
                                )} VND`}</span>
                                <span
                                    onClick={() =>
                                        setPrice({
                                            from: '',
                                            to: '',
                                        })
                                    }
                                    className='underline cursor-pointer hover:text-hovermain'
                                >
                                    Reset
                                </span>
                            </div>
                            <div className='flex gap-2 items-center justify-between p-4'>
                                <div className='flex items-center gap-2'>
                                    <label htmlFor='from'>From</label>
                                    <input
                                        type='number'
                                        id='from'
                                        className='form-input'
                                        value={price.from}
                                        onChange={(e) => setPrice((prev) => ({ ...prev, from: e.target.value }))}
                                    />
                                </div>
                                <div className='flex items-center gap-2'>
                                    <label htmlFor='to'>To</label>
                                    <input
                                        type='number'
                                        id='to'
                                        className='form-input'
                                        value={price.to}
                                        onChange={(e) => setPrice((prev) => ({ ...prev, to: e.target.value }))}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default memo(SearchItem);
