import { useEffect } from "react";

import { useIntersection } from "@mantine/hooks";


export interface IProps {
    scrollRef: any,
    loadMore: (page: number) => void,
    pages: number[],
    threshold: number
    searchValue: null | number
}

export const useHandleIntersectionEntry = ({ loadMore, pages, scrollRef, searchValue, threshold }: IProps) => {
    const { ref: topRef, entry: TopEntry } = useIntersection({
        root: scrollRef.current,
        threshold,
    });
    const { ref: bottomRef, entry: bottomEntry } = useIntersection({
        root: scrollRef.current,
        threshold,
    });


    useEffect(() => {
        if (bottomEntry?.isIntersecting) {
            const value = Math.min(...pages) - 1;
            if (searchValue && value >= 0) {
                loadMore(value);
            }
        }
        if (TopEntry?.isIntersecting) {
            loadMore(Math.max(...pages) + 1);
        }

    }, [TopEntry, bottomEntry]);


    return { bottomRef, topRef };
};
