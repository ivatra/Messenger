import React, { useEffect, useRef, useState } from "react";

import { getHotkeyHandler } from "@mantine/hooks";

import { useManageNavigationHint } from "./useManageNavigationHint";
import { clusterByAlignment } from "../helpers/clusterByAlignment";


type FocusElements = HTMLInputElement | HTMLButtonElement

interface IProps{
    parentRef: React.RefObject<HTMLElement>,
    nodesReclusteringCause?: any
    navigationButton?: string
    tolerance?:number
}

export const useNavigationByArrows = ({ parentRef, nodesReclusteringCause, navigationButton = "INSERT",tolerance = 8}:IProps) => {
    const [isNavigationMode, setNavigationMode] = useState<boolean>(false)
    const focusIndex = useRef({ col: 0, row: 0 });

    const gridNodes = useRef<FocusElements[][]>()

    useManageNavigationHint(isNavigationMode, navigationButton)

    const navigateToNextPos = (col: number, row: number) => {
        if (!gridNodes.current) return

        const node = gridNodes.current[col][row]
        focusIndex.current = { col, row }
        node.focus()
    }

    const onArrowKeyPress = (e: React.KeyboardEvent<HTMLElement> | KeyboardEvent) => {
        if (!isNavigationMode || !parentRef.current || !gridNodes.current) return

        if (e.key.includes('Arrow')) {
            e.preventDefault()
        }
        
        const { col, row } = focusIndex.current
        var nextPosition: [number, number] = [col, row]

        const colHeight = gridNodes.current.length - 1
        const rowHeight = gridNodes.current[col].length - 1

        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            var nextCol: number = col
            if (e.key === 'ArrowDown') {
                if (col + 1 > colHeight) nextCol = 0
                else nextCol = col + 1
            } else {
                if (col - 1 < 0) nextCol = colHeight
                else nextCol = col - 1
            }

            const rowExist = gridNodes.current[nextCol].length - 1 >= row

            if (!rowExist) nextPosition = [nextCol, 0]
            else nextPosition = [nextCol, row]

        } else if (e.key === 'ArrowRight') {
            if (row + 1 > rowHeight) nextPosition = [col, 0]
            else nextPosition = [col, row + 1]

        } else if (e.key === 'ArrowLeft') {
            if (row - 1 < 0) nextPosition = [col, rowHeight]
            else nextPosition = [col, row - 1]
        }

        navigateToNextPos(...nextPosition)
    }

    const globalKeyHandler = getHotkeyHandler([
        [navigationButton, () => setNavigationMode((prev) => !prev)],
    ])

    useEffect(() => {
        const nodeList: NodeListOf<FocusElements> | undefined = parentRef.current?.querySelectorAll('input, button');

        if (!nodeList) return

        gridNodes.current = clusterByAlignment(nodeList, tolerance)

        navigateToNextPos(0, 0)

    }, [parentRef.current, nodesReclusteringCause])

    useEffect(() => {
        parentRef.current?.addEventListener('keydown', onArrowKeyPress)
        document.body.addEventListener('keydown', globalKeyHandler)

        return () => {
            parentRef.current?.removeEventListener('keydown', onArrowKeyPress)
            document.body.removeEventListener('keydown', globalKeyHandler)
        }

    }, [parentRef.current, isNavigationMode])
}