import { useMemo } from 'react';
import { range } from 'ultils/helperFn';
const usePagination = (totalProductCount, currentPage, pageSize, siblingCount = 1) => {
    const paginationArray = useMemo(() => {
        const paginationCount = Math.ceil(totalProductCount / pageSize);
        const totalPaginationItem = siblingCount + 5;
        if (paginationCount <= totalPaginationItem) return range(1, paginationCount);
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, paginationCount);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < paginationCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = paginationCount;
        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, '...', paginationCount];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(paginationCount - rightItemCount + 1, paginationCount);
            return [firstPageIndex, '...', ...rightRange];
        }
        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
        }
    }, [totalProductCount, currentPage, siblingCount, pageSize]);
    return paginationArray;
};

export default usePagination;
