import { showInternal } from "../../app/lib/api/middlewares";
import { IStoreFeedback } from "../types";

type SetStateFunc<T> = (state: T | ((prevState: T) => T)) => void;
type RequestFunc = (...args: any[]) => Promise<Response>;


const handleRequest = async <T extends IStoreFeedback>(
    requestFunc: RequestFunc,
    set: SetStateFunc<T>
) => {
    let response: Response | undefined

    set((state) => ({ ...state, isError: false }));
    set((state) => ({ ...state, isLoading: true }));
    try {
        response = await requestFunc();

        if(!response.ok) set((state) => ({ ...state, isError: true }));  // Handling common error

    } catch (e) {
        set((state) => ({ ...state, isError: true })); // Handling internal error
        await showInternal()
    } finally {
        set((state) => ({ ...state, isLoading: false }));
    }
    return response;
};
export default handleRequest
