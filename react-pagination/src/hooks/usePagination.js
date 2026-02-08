import { useMemo, useState } from "react";

const usePagination = (items = [], pageSize = 10) => {
    const [currentPage, setCurrentPage] = useState(1); // For pagination

    const totalPages = Math.ceil(items.length / pageSize);
    
    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return items.slice(startIndex, endIndex);
    }, [items, currentPage, pageSize]);

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const goToPrev = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const goToNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };
    return {
        currentPage,
        totalPages,
        currentItems,
        goToPage,
        goToPrev,
        goToNext
    };
}

export default usePagination;