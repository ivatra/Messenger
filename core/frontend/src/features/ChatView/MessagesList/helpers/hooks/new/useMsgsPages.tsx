import { useState } from "react";

export const useMsgsPages = (searchValue: number | null) => {
    const [searchMsgsPages, setSearchMsgsPage] = useState<number[]>([]);
    const [regularMsgsPages, setRegularMsgsPages] = useState<number[]>([]);

    const [pages, setPages] = [searchValue ? searchMsgsPages : regularMsgsPages, searchValue ? setSearchMsgsPage : setRegularMsgsPages];

    return {
        pages,
        addRegularPage:(page:number) => setRegularMsgsPages((prev) => [...prev,page]),
        addPage: (page: number) => setPages((prev) => [...prev, page].sort((a, b) => a - b)),
        clearSearchPages: () => setSearchMsgsPage([])
    };
};
