import { Response } from "express"

export function successResponder(response: Response, payload: any, description=''){
    return response.status(200).json({
        error: false,
        description,
        payload
    })
}

export function errorResponder(response: Response, statusCode: number, description: string){
    return response.status(statusCode).json({
        error: true,
        description,
        payload: null
    })
}
