import { Group, Skeleton, Stack } from "@mantine/core";

export const SideBarItemSkeleton = () => {
    return (
        <Group spacing={'xs'} noWrap position = 'left'>
            <Skeleton circle height={38}/>
            <Stack spacing='xs' style={{ width: '60%' }}>
                <Skeleton width='85%' height={9} radius={8}/>
                <Skeleton width='145%' height={7} radius={8} />
            </Stack>
        </Group>
    );
};