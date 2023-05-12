import { Badge } from "@mantine/core";
import { useEffect, useRef, useState } from "react";

interface ICounterProps {
    order: "ASC" | "DESC";
    interval: number;
    maxValue: number;
    setCounterFinished:() => void
}

export const Counter: React.FC<ICounterProps> = ({
    order,
    maxValue,
    interval,
    setCounterFinished
}) => {
    const [count, setCount] = useState<number>(order === "ASC" ? 0 : maxValue);
    const ref = useRef<any>(null)

    const endPoint = order === "ASC" ? maxValue : 0

    const stopInterval = () => {
        clearInterval(ref.current)
    }

    useEffect(() => {
        ref.current = setInterval(() => {
            if (order === "DESC") setCount((prev) => prev - 1);
            else setCount((prev) => prev + 1)

            return () => {
                stopInterval()
            };
        }, interval);
    }, [])


    useEffect(() => {
        if (count === endPoint) {
            clearInterval(ref.current);
            setCounterFinished();
        }
    }, [count]);

    return <Badge>{count}</Badge>;
};