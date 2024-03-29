import { useState } from "react"
import Ask from "./Ask/Ask"
import Verification from "./Verification/Verification"
import useCaptchaStore from "../store/CaptchaStore"

const Captcha = (): JSX.Element => {
    const { isCaptcha, setCaptcha,isError } = useCaptchaStore()

    const [isAskPassed, setAskPassed] = useState<boolean>(false)

    return (
        isCaptcha ?
            isAskPassed ?
                <Verification setCaptcha={setCaptcha} />
                :
                <Ask setCaptcha={setCaptcha} passAsk={setAskPassed} />
            :
            <></>
    )
}

export default Captcha
