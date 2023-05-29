import { showInternalErrorMessage } from "./messages";
import { IStoreFeedback } from "../../types";

type SetStateFunc<T> = (state: T | ((prevState: T) => T)) => void;
type RequestFunc = (...args: any[]) => Promise<Response>;


export const handleRequest = async <T>(
    requestFunc: RequestFunc,
    set: SetStateFunc<IStoreFeedback>
): Promise<T | undefined> => {

    set((state) => ({ ...state, state: 'loading' }));

    try {
        const response = await requestFunc();

        if (!response.ok) {
            set((state) => ({ ...state, state: 'error' }));  // Handling common error (200,201... codes)
        }
        else {
            set((state) => ({ ...state, state: 'successful' }));
            const jsoned = await response.json()
            return jsoned
        }
    } catch (e) {
        set((state) => ({ ...state, state: 'error' })) // Handling internal error
        console.log(e)
        showInternalErrorMessage()
    }

    return undefined
};