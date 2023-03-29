import { ScrollArea, ScrollAreaProps, Stack } from "@mantine/core";
import { useRef, useState } from "react";
import { ScrollShevron } from "../../../../shared";

const scrollAreaProps: ScrollAreaProps = {
    scrollHideDelay: 300,
    type: "scroll",
    w:'100%',
    scrollbarSize: 7,
    styles: {
        scrollbar: {
            backgroundColor: "3f4750",
        },
    },
};

interface SectionListProps {
    isLoading: boolean;
    Skeleton: () => JSX.Element;
    EntitiesList: JSX.Element[] | JSX.Element;
}


const SectionList: React.FC<SectionListProps> = ({
    isLoading,
    Skeleton,
    EntitiesList,
}) => {
    const viewport = useRef<HTMLDivElement>(null);

    const [isVisible, setVisible] = useState<boolean>(false);

    const scrollToTop = () =>
        viewport.current?.scrollTo({ top: 0, behavior: "smooth" });


    const manageShevronVisibility = (position: {x: number;y: number;}) => {
        if (!viewport.current) return;

        if (position.y >= viewport.current.scrollHeight / 4) setVisible(true);
        else setVisible(false);
    };


    const SkeletonList = [...Array(10)].map((_, index) => (
        <Skeleton key={index} />
    ));

    return (
        <ScrollArea
            {...scrollAreaProps}
            viewportRef={viewport}
            onScrollPositionChange={manageShevronVisibility}>
            <Stack>
                {EntitiesList}
                {isLoading && SkeletonList}
            </Stack>
            <ScrollShevron
                onClick={scrollToTop}
                position="up"
                visible={isVisible}
                pos={{ bottom: '5rem', right: '1rem' }}
            />
        </ScrollArea>
    );
};

export default SectionList;
