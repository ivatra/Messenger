import { useState } from "react";

import { IUser } from "../..";
import { UserCard } from "./UserCard";

interface IContactTabProps {
    user: IUser
    onTabClick: () => void
}

export const UserTab: React.FC<IContactTabProps> = ({ user, onTabClick }) => {
    const [selected, setSelected] = useState<boolean>(false)

    const boxProps = {
        onMouseEnter: () => setSelected(true),
        onMouseLeave: () => setSelected(false),
        onClick: onTabClick,

        bg: selected ? 'dark.5' : 'initial',
        mx: '10px',
        py: '3px'
    }

    return (
        <UserCard
            user={user}
            props={boxProps}
            avatarSize='md'
            activityLabelSize='xs'
            userNameSize='sm' />
    );
};
