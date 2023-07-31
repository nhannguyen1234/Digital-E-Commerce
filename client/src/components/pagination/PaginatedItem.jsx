import React, { memo } from 'react';
import clsx from 'clsx';
import { useSearchParams, useNavigate, createSearchParams, useLocation } from 'react-router-dom';
const PaginatedItem = ({ children }) => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const handlePagination = () => {
        // let param = [];
        // for (let i of params.entries()) param.push(i);
        // const queries = {};
        // for (let i of params) queries[i[0]] = i[1];
        const queries = Object.fromEntries([...params]);
        if (Number(children)) queries.page = children;
        navigate({
            pathname: location.pathname,
            search: createSearchParams(queries).toString(),
        });
    };

    return (
        <button
            className={clsx(
                'w-10 h-10 flex items-center justify-center p-4 rounded-full transition duration-200 text-sm',
                Number(children) && 'hover:bg-[#afd2c9]',
                +params.get('page') === children && 'bg-[#afd2c9]',
                !+params.get('page') && Number(children) === 1 && 'bg-[#afd2c9]',
            )}
            type='button'
            onClick={handlePagination}
            disabled={!Number(children)}
        >
            {children}
        </button>
    );
};

export default memo(PaginatedItem);
