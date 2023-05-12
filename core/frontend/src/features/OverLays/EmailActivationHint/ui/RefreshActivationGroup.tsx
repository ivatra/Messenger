import { useState } from "react"

import { Group, Loader, Text, TextProps } from "@mantine/core"

import { useUserStore } from "../../../../entities"
import { HoverableText } from "../../../../shared"


export const RefreshActivationGroup = () => {
    const { refreshActivation, isLoading, isError } = useUserStore()

    const [isLetterRefreshed, setLetterRefreshed] = useState<boolean>(false)

    const handleRefreshActivation = () => {
        setLetterRefreshed(true)
        refreshActivation()
    }

    const refreshActivationButton = (
        <HoverableText
            onClick={() => handleRefreshActivation()}>
            Refresh Activation
        </HoverableText>
    )

    if (isLetterRefreshed && !isLoading && !isError) {
        return <Text>Letter has been successfully resend. Check your email.</Text>
    } else {
        return (
            <Group noWrap>
                <Text>Didn't get activation letter? {refreshActivationButton} </Text>
                {isLetterRefreshed && isLoading && <Loader size='sm' />}
            </Group>
        )
    }
}