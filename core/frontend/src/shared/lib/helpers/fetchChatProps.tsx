import { IChat } from "../../types";


export const fetchChatProps = (chat: IChat) => {
    var name: string, avatar: string, userId: string | undefined;
    if (chat.groupChat) {
        name = chat.groupChat.name;
        avatar = chat.groupChat.avatar;
    }
    else {
        name = chat.participants[0].user.name;
        avatar = chat.participants[0].user.avatar;
        userId = chat.participants[0].user.id
    }
    return { name, avatar, userId };
};
