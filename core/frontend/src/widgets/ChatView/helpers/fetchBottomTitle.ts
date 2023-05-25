import { SharedHelpers, SharedTypes } from "../../../shared";

export const generateBottomTitle = (chat: SharedTypes.IChat) => {
    let bottomTitle;
    if (chat.type === 'group') {
        bottomTitle = `${chat.groupChat.participiantsCount} participants are in`;
    } else {
        let lastSeen = chat.participants[0].user.lastSeen;
        let lastSeenDate = lastSeen ? SharedHelpers.formatDate(lastSeen) : 'unknown';
        bottomTitle = `last seen ${lastSeenDate}`;
    }
    return bottomTitle;
}