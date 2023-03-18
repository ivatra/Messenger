import { IStoreFeedback } from "../types";

type SetStateFunc<T> = (state: T | ((prevState: T) => T)) => void;
type RequestFunc = (...args: any[]) => Promise<Response>;


const handleRequest = <T extends IStoreFeedback>(
    requestFunc: RequestFunc,
    set: SetStateFunc<T>
) => async (...args: any[]) => {
    try {
        set((state) => ({ ...state, isError: false }));
        set((state) => ({ ...state, isLoading: true }));

        const response = await requestFunc(...args);

        if (!response.ok) {
            set((state) => ({ ...state, isError: true }));
        }

        return response;
    } finally {
        set((state) => ({ ...state, isLoading: false }));
    }
};
export default handleRequest
