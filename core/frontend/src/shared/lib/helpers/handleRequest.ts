import { showInternalErrorMessage } from "./messages";
import { IStoreFeedback } from "../../types";

type SetStateFunc<T> = (state: T | ((prevState: T) => T)) => void;
type RequestFunc = (...args: any[]) => Promise<Response>;


export const handleRequest = async <T>(
    requestFunc: RequestFunc,
    set: SetStateFunc<IStoreFeedback>
): Promise<T | undefined> => {

    set((state) => ({ ...state, isError: false }));
    set((state) => ({ ...state, isLoading: true }));

    try {
        const response = await requestFunc();

        if (!response.ok) {
            set((state) => ({ ...state, isError: true }));  // Handling common error (200,201... codes)
        }
        else {
            const jsoned = await response.json()
            return jsoned
        }
    } catch(e) {
        set((state) => ({ ...state, isError: true })); // Handling internal error
        console.log(e)
        await showInternalErrorMessage()
    } finally {
        set((state) => ({ ...state, isLoading: false }));
    }

    return undefined
};