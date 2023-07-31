import React, { memo } from 'react';
import usePagination from 'hooks/usePagination';
import PaginatedItem from './PaginatedItem';
import { useSearchParams } from 'react-router-dom';
const Pagination = ({ totalCount, pageSize }) => {
    const [params] = useSearchParams();
    const range = () => {
        const currentPage = +params.get('page');
        const start = pageSize * (currentPage - 1) + 1;
        const end = Math.min(currentPage * pageSize, totalCount);
        return `${start} - ${end}`;
    };
    const pagination = usePagination(totalCount, +params.get('page') || 1, pageSize);
    return (
        <div className='w-main flex items-center justify-between mb-4'>
            {!+params.get('page') ? <span className='text-sm italic'>{`Show products 1 - ${Math.min(pageSize, totalCount) || 8} of ${totalCount}`}</span> : ''}
            {+params.get('page') ? <span className='text-sm italic'>{`Show ${range()} of ${totalCount}`}</span> : ''}
            <div className='flex items-center gap-1'>
                {pagination?.map((el, index) => (
                    <PaginatedItem key={index}>{el}</PaginatedItem>
                ))}
            </div>
        </div>
    );
};

export default memo(Pagination);
