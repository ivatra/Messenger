import { useElementSize } from "@mantine/hooks";
import { useEffect, useState } from "react"

interface IProps {
    subjectSize: number
}

export const usePaginationLimit = ({ subjectSize }: IProps) => {
    const { ref: sizeRef, width, height } = useElementSize();
    const [limit, setLimit] = useState<number>(10)

    useEffect(() => {
        if (height === 0) return
        
        const calculatedLimit = Math.floor(height / subjectSize)
        setLimit(calculatedLimit)
    }, [height])


    return { sizeRef, limit }

}