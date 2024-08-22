import { createContext, useEffect, useState } from "react"



export let UserContext = createContext()

export function UserContextProvider(props)
{ 
    const [userLogIn, setUserLogIn] = useState(null)

    useEffect( ()=> { 
        if (localStorage.getItem('userToken') !== null) { 
            setUserLogIn(localStorage.getItem('userToken'))
        }
    }, [] )

    return <UserContext.Provider value={  { userLogIn , setUserLogIn }  }>
            {props.children }
    </UserContext.Provider>

}