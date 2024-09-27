import { useState } from "react";
import {useUserContext} from "./useUserContext"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useUserContext()

    const signup = async (name, lastname,email,password,profile_picture) => {
        setIsLoading(true)
        setError(null)
        const response = await fetch('/user/signup', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({name,lastname,email,password,profile_picture})
        })
        const json = await response.json()
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            localStorage.setItem('user',JSON.stringify(json))
            dispatch({type:'LOGIN', payload:json})
            setIsLoading(false)
        }
    }
    return {signup, isLoading, error}

}
