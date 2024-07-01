import { createContext, useEffect, useState } from "react";
import { getuser } from "../features/authentification";


export const AuthContext = createContext()

export function AuthProvider({children}){
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    async function verifieConnexion(){
      try{
        const connexion = await getuser()
        setConnected(connexion)
        console.log('refresh')
      }catch (error){
        
      }
      
    }

    verifieConnexion()
    
  })

    return(
      <AuthContext.Provider value={{connected, setConnected}}>
        {children}
      </AuthContext.Provider>  
    )
}