import { createContext, useEffect, useState } from "react";
import { getuser } from "../features/authentification";


export const AuthContext = createContext()

export const PageContext = createContext()

export function AuthProvider({children}){
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    async function verifieConnexion(){
      try{
        const connexion = await getuser()
        setConnected(connexion)
        //console.log('refresh')
      }catch (error){
        console.error(error)
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

export function PageProvider({children}){
  const [isPage, setPage] = useState("")

  return (
    <PageContext.Provider value={{isPage, setPage}}>
        {children}
    </PageContext.Provider>
  )
}