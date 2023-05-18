import { createContext } from "react";

import { SharedTypes } from "../../../shared";

export const ChatContext = createContext<SharedTypes.IChat>({} as SharedTypes.IChat)