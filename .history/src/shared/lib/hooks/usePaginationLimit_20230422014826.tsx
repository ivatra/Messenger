import { useElementSize } from "@mantine/hooks";
import { useEffect, useState } from "react"

interface IProps {
    subjectSize: number
}



/* Dynamic limit */
export const useDynamicLimit = ({ subjectSize }: IProps) => {
    const { ref: sizeRef, width, height } = useElementSize();
    const [limit, setLimit] = useState<number>(20)

    useEffect(() => {
        if (height === 0) return

        const calculatedLimit = Math.floor(height / subjectSize)
        setLimit(calculatedLimit)
    }, [height, subjectSize])


    return { sizeRef, limit }

}