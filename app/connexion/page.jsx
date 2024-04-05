'use client'

import Link from "next/link";
import {useState} from 'react';
import { authentificate } from "../features/authentification";

import { motion } from "framer-motion"



function FormConnexion({forgetPassword,}){

  const [dataForm, setDataForm] = useState({
    username:'',
    password:''
  })

  const [etatButtonForm, setEtatButtonForm] = useState('valider')
  const [errorMessage, setErrorMessage] = useState(false) 

  async function login(){
    
    const error = await authentificate(dataForm)
    if(error){
        setErrorMessage(error)
        setEtatButtonForm('valider')
    }
    
  }

  return(
    <form action={login}>
      <h1 className="text-lg text-center font-bold">Connexion a mon compte</h1>
        <p className="text-base text-center font-light">Veuillez renseigner vos informations</p>
        <div className="w-full mt-3.5">
          {errorMessage && <div className="text-base text-center text-rouge">{errorMessage}</div>}
          <div className="text-base" name="email">Email</div>
          <input className="w-full border border-gray-300 px-1 py-2" onChange={(e)=>{setDataForm({...dataForm, username: e.target.value})}} value={dataForm.username} type="email" placeholder="Email"></input>
        </div>
        <div className="w-full mt-3.5">
          <div className="text-base" name="password">Mot de passe actuel</div>
          <input value={dataForm.password} onChange={(e)=>{setDataForm({...dataForm, password: e.target.value})}} className="w-full border border-gray-300 px-1 py-2" type="password" placeholder="password"></input>
        </div>
        <div className="cursor-pointer w-fit text-right text-jaune text-base underline" onClick={forgetPassword}>mot de passe oublié ?</div>

        <button onClick={()=>{setEtatButtonForm('connexion en cours...'),setErrorMessage(true)}} type="submit" className="mt-6 text-base w-full h-[40px] flex justify-center bg-jaune text-center py-2.5 rounded-md mb-2">{etatButtonForm} </button>
     

    </form>
  )
}

function FormForgetPassword(){
  return( 
    <>
      <h1 className="text-lg text-center font-bold">Mot de passe oublié</h1>
        <p className="text-base text-center font-light">Renseignez votre email pour reintialiser votre mot de passe</p>
        <div className="w-full mt-3.5">
          <div className="text-base">Email</div>
          <input className="w-full border border-gray-300 px-1 py-2" type="email" placeholder="Sagoe"></input>
        </div>
     

        <button className="mt-6 text-base w-full bg-jaune text-center py-2.5 rounded-md mb-2">Valider</button>

    </>
  )
}


function PopupConnexion({className=" ", closePopup}){

  const logo = "/logo.png"

  const [forgetPassword, setForgetPassword] = useState(false)

  return(


    <motion.div initial={{opacity: 0, y:50}} animate={{opacity:1, y:0}} transition={{duration:0.3}} className="flex mt-20 justify-center h-screen ">
        <div className="bg-white p-5 w-[300px] sm:w-[500px]   sm:p-8">
            <Link href={"/"}><img className="w-[150px] mx-auto" loading='lazy' alt="Image" src={logo} /></Link>
            { !forgetPassword ? <FormConnexion forgetPassword={()=>{setForgetPassword(true)}}></FormConnexion> : <FormForgetPassword></FormForgetPassword>}
            <div className="text-base">Pas encore inscrit ? <Link href={"/inscription"} className="text-jaune text-base">Créer un compte</Link></div>
        </div>
    </motion.div>

      


  )
}


export default function PageConnexion(){
    return(<PopupConnexion></PopupConnexion>)
}