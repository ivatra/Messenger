import { useEffect, useRef, RefObject } from "react";

interface IProps {
    targetRef: RefObject<HTMLDivElement> | null;
    isObserved: boolean;
    options: IntersectionObserverInit;
    executeOnIntersection: () => void;
}

export const useIntersectionObserver = ({
    targetRef,
    isObserved,
    options,
    executeOnIntersection
}: IProps) => {
    const observerRef = useRef<IntersectionObserver | null>(null);

    const unobserve = () => {
        if (observerRef.current && targetRef?.current) {
            observerRef.current.unobserve(targetRef.current);
        }
    };

    const callbackFunc = (
        entries: IntersectionObserverEntry[],
        _: IntersectionObserver
    ) => {
        const [entry] = entries
        
        if (entry.isIntersecting) {
            executeOnIntersection();
        }
    };

    useEffect(() => {
        if (targetRef?.current) {
            if (!isObserved) {
                unobserve();
            } else {
                observerRef.current = new IntersectionObserver(callbackFunc, options);
                observerRef.current.observe(targetRef.current);
            }
        }
        return () => {
            unobserve();
        };
    }, [isObserved, targetRef]);
};
