import { useState } from "react"
import Ask from "./Ask/Ask"
import Verification from "./Verification/Verification"
import { useCaptchaStore } from "../store/CaptchaStore"



export const Captcha: React.FC = (): JSX.Element => {
    const { setCaptcha, isError } = useCaptchaStore()

    const [isAskPassed, setAskPassed] = useState<boolean>(false)

    return (
        isAskPassed
            ? <Verification setCaptcha={setCaptcha} />
            : <Ask setCaptcha={setCaptcha} passAsk={setAskPassed} />
    )
}

