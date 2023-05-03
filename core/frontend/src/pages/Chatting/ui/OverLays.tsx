import React, { useCallback } from "react"

import { Notifications } from "@mantine/notifications"

import { SessionExpiredModal, Captcha, useCaptchaStore } from "../../../features"
import { useContactInteractionStore, useUserStore, ContactModal } from "../../../entities"


 const OverLays = (): JSX.Element => {
    const { isSessionExpired } = useUserStore()
    const { isCaptcha } = useCaptchaStore()
    const { contactModalisOpened } = useContactInteractionStore()

    const overlays = [
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
            <Notifications />
            {VisibleComponent && <VisibleComponent />}
        </>
    )
}

export const MemoizedOverlays = React.memo(OverLays)



