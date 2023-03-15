export interface ICaptcha{
    id: string
    isCaptcha:boolean
    svgData:string
    answer: string 
    receiveCaptcha:() => Promise<void>
    verifyAnswer:(answer:string) => Promise<void> 
    setCaptcha:(value:boolean) => void
}