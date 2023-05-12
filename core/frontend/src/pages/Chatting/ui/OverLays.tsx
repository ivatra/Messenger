import React, { useCallback } from "react"

import { Notifications } from "@mantine/notifications"

import { SessionExpiredModal, Captcha, useCaptchaStore, EmailActivationHint } from "../../../features"
import { useContactInteractionStore, useUserStore, ContactModal } from "../../../entities"


interface IOverlays {
    component: React.FC
    condition: boolean
    priority: 1 | 2 | 3 | 4
}

const OverLays = (): JSX.Element => {
    const { isSessionExpired,isActivated } = useUserStore()
    const { isCaptcha } = useCaptchaStore()
    const { contactModalisOpened } = useContactInteractionStore()

    const overlays: IOverlays[] = [
        { component: EmailActivationHint, condition: !isActivated, priority: 4 },
        { component: SessionExpiredModal, condition: isSessionExpired, priority: 3 },
        { component: Captcha, condition: isCaptcha, priority: 2 },
        { component: ContactModal, condition: contactModalisOpened, priority: 1 },
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



