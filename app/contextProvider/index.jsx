import { createContext, useState } from "react";


export const AuthContext = createContext()

export function AuthProvider({children}){
    const [tokken, setTokken] = useState("")

    return(
      <AuthContext.Provider value={{tokken, setTokken}}>
        {children}
      </AuthContext.Provider>  
    )
}