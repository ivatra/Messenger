import { apiURL } from "@/src/shared"
import ky from "ky"

export var api = ky.create({
    prefixUrl:apiURL,
    timeout:500,
    hooks:{
        afterResponse:[
            () => { 
                 
            }

        ]
    }
})