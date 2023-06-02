import { useDidUpdate } from "@mantine/hooks";

interface IProps {
    renderedItems: JSX.Element | undefined;
    setLoading:(bool:boolean) => void
    needScrollToBottom: React.MutableRefObject<boolean>
    needScrollToMsg: React.MutableRefObject<boolean>
    searchValue: number | null
    scrollRef: React.RefObject<HTMLDivElement>;
}

export const useManageOverFlowPosition = (
    {
        renderedItems,
        needScrollToBottom,
        scrollRef,
        needScrollToMsg,
        setLoading,
        searchValue
    }: IProps) => {
    useDidUpdate(() => {
        const scrollToSpecificMsg = (msgIndex: number) => {
            const element = scrollRef?.current?.querySelector(`[data-key="${msgIndex}"]`);
            element?.scrollIntoView({ behavior: 'auto', block: 'center' });
        };

        if(!scrollRef.current) return
        
        const scrollToBottom = () => scrollRef?.current?.scrollTo({ top: scrollRef.current.scrollHeight });

        if (needScrollToBottom.current) {
            console.log(renderedItems)
            scrollToBottom();
            needScrollToBottom.current = false;
        }

        if (needScrollToMsg.current && searchValue) {
            setTimeout(()=>{
                scrollToSpecificMsg(searchValue);
                needScrollToMsg.current = false;
            },400)
          
        }

        setLoading(false)


    }, [renderedItems]);

};
