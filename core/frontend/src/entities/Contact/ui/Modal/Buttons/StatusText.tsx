import { FC } from 'react'
import { Stack } from '@mantine/core'
import { TextTab } from './TextTab'
import { IconBookmark } from '@tabler/icons-react';

interface IStatusTabProps {
    status: string | null;
    display?:string
}

export const StatusText: FC<IStatusTabProps> = ({ status,display }) => {
    if (!status) return <></>

    const statusWithCapital = status.charAt(0).toUpperCase() + status.slice(1)

    return (
        <Stack spacing="md">
            <TextTab content={statusWithCapital} label="Status" Icon={IconBookmark} />
        </Stack>
    )


}