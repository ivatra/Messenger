import { useEffect, useState } from "react"

import { IDictUser, IUser } from "../types/UserModel"
import { useUserStore } from "../Store/UserStore"
import { CenterLoader } from "../../../shared/ui"


interface IProps {
    children: React.ComponentType<{ user: IUser }>
    users: IDictUser
    userId: string
}


export const UserWrapper: React.FC<IProps> = ({ children, userId, users }) => {
    const [user, setUser] = useState<IUser>()
    const { receiveById } = useUserStore()

    useEffect(() => {
        const us = users[userId]

        if (us) {
            setUser(user)
        } else {
            receiveById(userId)
        }

    }, [users[userId]])

    if (!user) {
        return <CenterLoader />
    } else {
        const ChildrenComponent = children; // Capitalize component variable name
        return <ChildrenComponent user={user} />
    }
}