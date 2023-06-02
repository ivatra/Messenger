// import { useState } from "react";
// import { generateMessages } from "../GenerateMessages";
// import { msgsType } from "./msgsType";

// export const useLoadMessages = (limit:number) => {
//     const [messages, setMessages] = useState<msgsType>({});;
//     const [isLoading, setIsLoading] = useState<boolean>(false);

//     const receiveByOffset = (page: number, offset: number) => {
//         setIsLoading(true);
//         const newMessages = generateMessages(offset, limit);
//         setMessages((prev) => {
//             return { ...prev, [page]: newMessages };
//         });
//         setIsLoading(false);
//     };

//     return { isLoading, messages, receiveByOffset, setIsLoading };
// };

export {}