import { UserContext } from "../Context/userContext";
import { useContext } from "react";
export const useUserContext = () => {
    const context = useContext(UserContext)
    if(!context){
        throw Error('useUserContext must be used inside the provider')
    }
    return context
}