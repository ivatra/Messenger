import { createContext } from "react";

import { IChat } from "../../../shared";

export const ChatContext = createContext<IChat>({} as IChat)