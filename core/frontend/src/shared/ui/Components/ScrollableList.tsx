import { useState } from "react";

import { Group, Loader, ScrollArea, ScrollAreaProps, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { DESKTOP_WIDTH } from "../../consts";
import { ScrollShevron } from "..";

const scrollAreaProps: ScrollAreaProps = {
    scrollHideDelay: 300,
    type: "hover",
    offsetScrollbars:true,
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
    Skeleton?: () => JSX.Element;
    EntitiesList: JSX.Element[] | JSX.Element ;
}

export const ScrollableList: React.FC<ScrollableListProps> = ({
    isLoading,
    Skeleton,
    scrollRef,
    EntitiesList,
    onScrollPosChange
}) => {
    const isDesktop = useMediaQuery(`(min-width: ${DESKTOP_WIDTH})`);

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
    // const SkeletonList = [...Array(15)].map((_, index) => (
    //     <Skeleton key={index} />
    // ));

    return (
        <ScrollArea
            h = '100%'
            {...scrollAreaProps}
            viewportRef={scrollRef}
            onScrollPositionChange={handLeScrollPosChange}>
            <Stack spacing={0}>
                {EntitiesList}
                {isLoading && <Loader style={{alignSelf:'center'}}/>}
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
