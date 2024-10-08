import { createContext, useEffect, useReducer } from "react";

export const UserContext = createContext();
export const userReducer = (state,action) => {
    switch(action.type){
        case 'LOGIN' :
            return {user : action.payload}
        case 'LOGOUT' :
            return {user : null}
        case 'UPDATE':
            return {user : action.payload}
        default :
            return state

    }
}
export const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReducer,{
        user: null
    })
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        if (user){
            dispatch({type:'LOGIN',payload: user})
        }
    },[])
    console.log('user state : ',state)
    return (
        <UserContext.Provider value = {{...state,dispatch}}>
            {children}
        </UserContext.Provider>
    )
}
