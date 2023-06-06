import React, { useCallback } from "react"

import { SessionExpiredModal, Captcha, useCaptchaStore, EmailActivationHint, ChatCreation, ImageView, ChatInfo } from "../../../features"
import { useContactInteractionStore, useUserStore, ContactModal, useChatStore, useMessageStore } from "../../../entities"


interface IOverlays {
    component: React.FC
    condition: boolean
    priority: 1 | 2 | 3 | 4
}

const OverLays = (): JSX.Element => {
    const { isSessionExpired, isActivated } = useUserStore()
    const isCaptcha = useCaptchaStore(state => state.isCaptcha)
    const contactModalisOpened = useContactInteractionStore(state => state.contactModalisOpened)
    const { isGroupChatCreationOpened, isChatInfoOpened } = useChatStore()
    const isImageViewEnabled = useMessageStore().isImageViewEnabled
    const overlays: IOverlays[] = [
        { component: ChatInfo, condition: isChatInfoOpened, priority: 1 },
        { component: ImageView, condition: isImageViewEnabled, priority: 1 },
        { component: EmailActivationHint, condition: !isActivated, priority: 4 },
        { component: SessionExpiredModal, condition: isSessionExpired, priority: 3 },
        { component: Captcha, condition: isCaptcha, priority: 2 },
        { component: ContactModal, condition: contactModalisOpened, priority: 1 },
        { component: ChatCreation, condition: isGroupChatCreationOpened, priority: 4 }
    ];

    const getVisibleComponent = useCallback(() => {
        const sortedOverlays = overlays.sort((a, b) => b.priority - a.priority);
        for (const overlay of sortedOverlays) {
            if (overlay.condition) return overlay.component
        }
        return null
    }, [overlays])

    const VisibleComponent = getVisibleComponent()

    return (
        <>
            {VisibleComponent && <VisibleComponent />}
        </>
    )
}

export const MemoizedOverlays = React.memo(OverLays)



