import { useDidUpdate } from "@mantine/hooks";
import { useEffect } from "react";

interface IHandleSearchProps {
    needScrollToBottom: React.MutableRefObject<boolean>
    needScrollToMsg: React.MutableRefObject<boolean>
    clearSearchPages: () => void;
    totalMessages: number
    limit: number
    searchValue: number | null;
    loadMsgsBySearch: (page: number) => void;
}

export const useHandleSearch = ({ clearSearchPages,
    loadMsgsBySearch,
    limit,
    needScrollToMsg,
    needScrollToBottom,
    searchValue,
    totalMessages
}: IHandleSearchProps) => {
    useEffect(() => {
        clearSearchPages();
        if (searchValue) {
            let page: number;
            if (searchValue > totalMessages) {
                page = Math.round(totalMessages / limit)
            } else {
                page = Math.round((totalMessages - searchValue) / limit);
                console.log(page)
            }


        for (var i = page - 1; i < page + 2; i++) {
            if (i >= 0 && i < totalMessages / limit) {
                loadMsgsBySearch(i);
            }
        }

            needScrollToMsg.current = true;
        } else {
            needScrollToBottom.current = true;
        }
    }, [searchValue]);
};
