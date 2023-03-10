import ky from "ky"
import {apiURL} from "../../../shared"
import {Button} from "@mantine/core"

export var api = ky.create({
    hooks:{
        afterResponse:[
            () => { 
            }

        ]
    }
})