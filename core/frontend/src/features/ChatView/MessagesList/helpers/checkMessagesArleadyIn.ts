import { IContentItem } from "../../../../entities";

export const checkMessagesAlreadyIn = (items:IContentItem[], startIndex:number, endIndex:number) => {
    const itemsContainFirstIndex =  items.some(
        (item) =>
            item.type === "Message" &&
            item.data.index === startIndex
    );

    const itemContainSecondIndex = items.some(
        (item) =>
            item.type === "Message" &&
            item.data.index === endIndex
    );

    return itemsContainFirstIndex && itemContainSecondIndex
};