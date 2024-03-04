'use client'

import Link from "next/link";
import { useState } from 'react';



function FormConnexion({forgetPassword}){
  return(
    <>
      <h1 className="text-lg text-center font-bold">Connexion a mon compte</h1>
        <p className="text-base text-center font-light">Veuillez renseigner vos informations</p>
        <div className="w-full mt-3.5">
          <div className="text-base">Email</div>
          <input className="w-full border border-gray-300 px-1 py-2" type="email" placeholder="Sagoe"></input>
        </div>
        <div className="w-full mt-3.5">
          <div className="text-base">Mot de passe actuel</div>
          <input className="w-full border border-gray-300 px-1 py-2" type="password" placeholder="Sagoe"></input>
        </div>
        <div className="cursor-pointer w-fit text-right text-jaune text-base underline" onClick={forgetPassword}>mot de passe oublié ?</div>

        <button className="mt-6 text-base w-full bg-jaune text-center py-2.5 rounded-md mb-2">Valider</button>

    </>
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

    
    <div className={'fixed flex justify-center items-center  h-screen w-full z-10 ' + className}>
      <div onClick={
          ()=>{
            if(forgetPassword) setForgetPassword(false)
            closePopup()}
        } className='w-full h-screen opacity-50 bg-slate-900'></div>

      <div className="w-[500px] rounded absolute opacity-100  bg-white p-8">
        <img className="w-[150px] mx-auto" loading='lazy' alt="Image" src={logo} />
          { !forgetPassword ? <FormConnexion forgetPassword={()=>{setForgetPassword(true)}}></FormConnexion> : <FormForgetPassword></FormForgetPassword>}
        <div className="text-base">Pas encore inscrit ? <Link href={"/inscription"} className="text-jaune text-base">Créer un compte</Link></div>
      </div>

    </div>
  )
}




export default function Header(){

    const logo = "/logo.png"
    const search = "/search.png"
    const user = "/user.png"
    const shoppingBag = "/shopping-bag.svg"

const [popupOpen, setPopupOpen] = useState('hidden')

  function closePopup(){
  
    setPopupOpen('hidden')
  }

    return(
      <div>
        <PopupConnexion className={popupOpen} closePopup={closePopup} ></PopupConnexion>
                
              <div className="w-full flex items-center justify-center h-[56px] bg-[#f6cb05]">
                  <p className="text-center font-normal text-black text-base">
                    Dans le cadre des fêtes de fin d’années, profitez de -40% sur tous nos produits
                  </p>
                </div>
              
              <div className="px-8 py-1 flex items-center justify-between w-full bg-white">

        <img className="w-[150px]" alt="Image" src={logo} />

        <Link href={"/m/quisommesnous"}>
          <div className=" font-sans font-normal text-black text-lg">
            Qui sommes-nous ?
          </div>
        </Link>

        <Link href={"/m/FAQ"}>
          <div className="font-sans font-normal text-black text-lg">
            FAQ
          </div>
        </Link>

        <div className="w-[325px] h-[42px] flex border-[0.3px] border-solid border-[0.3px] border-solid rounded-[5px]">
          <div className="w-[52px] bg-[#f6cb05] flex items-center justify-center rounded-[5px_0px_0px_5px] h-[41px] top-0 left-0">
              <img className="w-[24px] h-[24px]" alt="Search" src={search} />
          </div>
          <div className="font-sans h-[40px] font-normal text-black text-lg">
            <input type="search" placeholder="Rechercher un produit"className="font-sans w-[277px] text-base p-1 h-full outline-0" ></input>
          </div>
          
        </div>


        <img onClick={() => setPopupOpen("")} className="w-[30px] h-[30px]" alt="User" src={user} />

        <div className="flex items-center justify-center">
          <Link href={"/m/panier"}>
            <img
              className="w-[30px] h-[30px]"
              alt="Shopping bag"
              src={shoppingBag}
            />
          </Link> 

          <div className="w-[25px] ml-1 flex justify-center items-center h-[25px]  bg-[#f6cb05] rounded-full">
            <div className="font-sans font-normal text-black ">
              0
            </div>
          </div>
        </div>

        
        
   </div>
   </div>
    )
}