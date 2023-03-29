import { IInbox } from "../types/Model";


export const fetchProps = (inbox: IInbox) => {
    var name:string, avatar:string;
    if (inbox.chat.groupChat) {
        name = inbox.chat.groupChat.name;
        avatar = inbox.chat.groupChat.avatar;
    }
    else {
        name = inbox.chat.participants[0].user.name;
        avatar = inbox.chat.participants[0].user.avatar;
    }
    return { name, avatar };
};
