import { useRef } from "react";

import { useDidUpdate } from "@mantine/hooks";

import { useContactListStore } from "../../../../entities";


export const useScrollOnTabSwitch = () => {
    const {
        filter,
        searchTerm,
    } = useContactListStore()

    const scrollViewPort = useRef<HTMLDivElement>(null);

    useDidUpdate(() => {
        scrollToTop()
    }, [searchTerm, filter])

    const scrollToTop = () => scrollViewPort?.current?.scrollTo({ top: 0, behavior: 'smooth' });
    
    return scrollViewPort

}