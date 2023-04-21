import { Group, ScrollArea, ScrollAreaProps, Stack } from "@mantine/core";
import { useState } from "react";
import { DESKTOP_WIDTH, ScrollShevron } from "../..";
import { useMediaQuery, useViewportSize } from "@mantine/hooks";

const scrollAreaProps: ScrollAreaProps = {
    scrollHideDelay: 300,
    type: "hover",
    pb: 'xs',
    scrollbarSize: 7,
    styles: {
        scrollbar: {
            backgroundColor: "3f4750",
        }
    },
};

type scrollPos = { x: number; y: number; }

interface ScrollableListProps {
    isLoading: boolean;
    onScrollPosChange?: (pos: scrollPos) => void
    scrollRef: React.RefObject<HTMLDivElement>
    Skeleton: () => JSX.Element;
    EntitiesList: JSX.Element[];
}


export const ScrollableList: React.FC<ScrollableListProps> = ({
    isLoading,
    Skeleton,
    scrollRef,
    EntitiesList,
    onScrollPosChange
}) => {
    const isDesktop = useMediaQuery(`(min-width: ${DESKTOP_WIDTH})`);
    const { height, width } = useViewportSize();

    const [isVisible, setVisible] = useState<boolean>(false);

    const scrollToTop = () => scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });

    const manageShevronVisibility = (position: scrollPos) => {
        if (!scrollRef.current) return;

        if (position.y >= scrollRef.current.scrollHeight / 4) setVisible(true);
        else setVisible(false);
    };

    const handLeScrollPosChange = (pos: scrollPos) => {
        manageShevronVisibility(pos)
        onScrollPosChange && onScrollPosChange(pos)
    }

    const SkeletonList = [...Array(15)].map((_, index) => (
        <Skeleton key={index} />
    ));

    return (
        <ScrollArea
            h={height - 56}
            {...scrollAreaProps}
            viewportRef={scrollRef}
            onScrollPositionChange={handLeScrollPosChange}>
            <Stack spacing={0}>
                {EntitiesList}
                {isLoading && SkeletonList}
            </Stack>
            <Group position="right">
                <ScrollShevron
                    onClick={scrollToTop}
                    position="up"
                    visible={isVisible}
                    pos={{ right: '1rem', bottom: isDesktop ? '5rem' : '9rem' }}
                />
            </Group>
        </ScrollArea>
    );
};
