import { useRef } from "react";

import { useDidUpdate } from "@mantine/hooks";


export const useScrollOnTabSwitch = (dependencies:any[]) => {
    const scrollViewPort = useRef<HTMLDivElement>(null);

    useDidUpdate(() => {
        scrollToTop()
    }, [dependencies])

    const scrollToTop = () => scrollViewPort?.current?.scrollTo({ top: 0, behavior: 'smooth' });
    
    return scrollViewPort

}