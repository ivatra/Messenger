import { Loader } from "@mantine/core";


export const useLoader = (enableLoader:boolean) => {
    if (enableLoader) {
        return <Loader />
    }
}