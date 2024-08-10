'use client'

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { resetPassword } from "../features/authentification"

export default function resetPasswordPage(){
    const logo = "/logo.png"

    const [isSuccesChange, setSuccesChange] = useState(false)
    const [isErrorCode, setErrorCode] = useState(false)

    const [dataForm, setData] = useState({
        email: "",
        newPassword: "",
    })

    const [isTextButton, setTextButton] = useState("Rénitialiser le mot de passe")
   

    async function reintialiserPassword(){
        setTextButton('Chargement...')
        const response = await resetPassword(dataForm)

        if (response === true){
          if(isErrorCode) setErrorCode(false)
          setTextButton('Rénitialiser le mot de passe')
          return setSuccesChange(true)
        }
        
        setErrorCode(true)
        console.log(response)
    }
  
    return(
  
  
      <motion.div initial={{opacity: 0, y:50}} animate={{opacity:1, y:0}} transition={{duration:0.3}} className="flex mt-20 justify-center h-screen ">
      
          <div className="bg-white p-5 w-[300px] sm:w-[500px]   sm:p-8">
            
              <Link href={"/"}><img className="w-[150px] mx-auto" loading='lazy' alt="3d supply chain" src={logo} /></Link>
              <form action={reintialiserPassword}>
      <h1 className="text-lg text-center font-bold">Rénitialisation du mot de passe</h1>
        <p className="text-base text-center font-light">Veuillez entrer le nouveau mot de passe</p>
        <div className="w-full mt-3.5">
        {isSuccesChange && <div className="text-base text-center text-green-600">Votre mote de passe a été modifié avec succès. <Link href={"/connexion"} className="underline ">Cliquez ici pour vous connecter avec vos nouveaux identifiants.</Link></div>}
        {isErrorCode && <div className="text-base text-center text-rouge">E-mail incorrecte. Veuillez entrer votre e-mail actuelle. </div>}
          <div className="text-base" name="email">Email</div>
          <input className="w-full border border-gray-300 px-1 py-2" value={dataForm.email} type="email" placeholder="Email" onChange={(e)=>setData({...dataForm, email: e.target.value})}></input>
        </div>
        <div className="w-full mt-3.5">
          <div className="text-base" name="password">Nouveau mot de passe</div>
          <input value={dataForm.password} className="w-full border border-gray-300 px-1 py-2" type="newPassword" placeholder="password" onChange={(e)=>setData({...dataForm, newPassword: e.target.value})}></input>
        </div>

        <button type="submit" className="mt-6 text-base w-full h-[40px] flex justify-center bg-jaune text-center py-2.5 rounded-md mb-2">{isTextButton}</button>
     

    </form>
            </div>
      </motion.div>
  
        
  
  
    )}