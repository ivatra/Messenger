import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppDispath, RootState } from "../store";
import { useSelector } from "react-redux";


export const useTypedDispatch = () => useDispatch<AppDispath>()
export const useTypedSelector:TypedUseSelectorHook<RootState> = useSelector