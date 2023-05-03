import { Center, Loader } from "@mantine/core"


export const CenterLoader = () => {
    return (
        <Center pos='relative' top='50%' >
            <Loader />
        </Center>
    )
}