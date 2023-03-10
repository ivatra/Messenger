export interface ICaptcha{
    id: string
    answer: string
    isCaptcha:boolean
    setAnswer:(answer:string) => Promise<void> 
}