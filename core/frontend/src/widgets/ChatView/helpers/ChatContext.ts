import { createContext } from "react";

import { SharedTypes } from "../../../shared";


interface IContext{
    chat:SharedTypes.IChat
    msgIndex:number | null
}
export const ChatContext = createContext<IContext>({} as IContext)