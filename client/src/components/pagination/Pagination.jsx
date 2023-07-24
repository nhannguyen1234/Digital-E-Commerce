import React, { memo } from 'react';
import usePagination from 'hooks/usePagination';
import PaginatedItem from './PaginatedItem';
import { useSearchParams } from 'react-router-dom';
const Pagination = ({ totalCount }) => {
    const [params] = useSearchParams();

    const range = () => {
        const currentPage = +params.get('page');
        const pageSize = process.env.REACT_APP_PRODUCT_LIMIT;
        const start = pageSize * (currentPage - 1) + 1;
        const end = Math.min(currentPage * pageSize, totalCount);
        return `${start} - ${end}`;
    };
    const pagination = usePagination(totalCount, +params.get('page'));
    return (
        <div className='w-main flex items-center justify-between mb-4'>
            {!+params.get('page') && (
                <span className='text-sm italic'>{`Show products 1 - ${
                    process.env.REACT_APP_PRODUCT_LIMIT || 8
                } of ${totalCount}`}</span>
            )}
            {+params.get('page') && (
                <span className='text-sm italic'>{`Show products ${range()} of ${totalCount}`}</span>
            )}
            <div className='flex items-center gap-1'>
                {pagination?.map((el, index) => (
                    <PaginatedItem key={index}>{el}</PaginatedItem>
                ))}
            </div>
        </div>
    );
};

export default memo(Pagination);
