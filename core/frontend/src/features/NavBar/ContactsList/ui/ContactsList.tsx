import { useMemo, useRef, useState } from "react";

import { SharedUi } from "../../../../shared";
import { UserWrapper, useContactListStore, IUser, useUserStore, UserTab } from "../../../../entities";

interface IContactsListProps {
    onContactTabClick: (contact: IUser) => void
    limit: number
    visibleUsers: IUser[]
}

export const ContactsList: React.FC<IContactsListProps> = ({ onContactTabClick, visibleUsers, limit }) => {
    const [scollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });
    const scrollViewPort = useRef<HTMLDivElement>(null);

    
    return (
        <SharedUi.ScrollableList
            EntitiesList={ContactsComponent}
            Skeleton={SharedUi.SideBarItemSkeleton}
            scrollRef={scrollViewPort}
            isLoading={state === 'loading'}
            onScrollPosChange={onScrollPositionChange}
        />
    );

}