'use client'

import Link from "next/link";
import { useEffect, useState, useContext} from 'react';
import {authentificate, deleteCookies, getuser }from "../features/authentification";
import { useRouter } from "next/navigation";
import { getPanier } from "../features/getData";
import { AuthContext } from "../contextProvider";





function FormConnexion({forgetPassword,}){

  const authentification = useContext(AuthContext)

  const router =  useRouter()

  const [dataForm, setDataForm] = useState({
    username:'',
    password:''
  })

  const [etatButtonForm, setEtatButtonForm] = useState('valider')
  const [errorMessage, setErrorMessage] = useState(false) 

  async function login(){
    
    const response = await authentificate(dataForm)
    if(!response){

        setErrorMessage("Mail ou mot de passe incorrect")
        setEtatButtonForm('valider')
        return null
    }

    authentification.setConnected(true)
    router.replace('compte')
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

    
    <div className={'fixed flex justify-center items-center  h-screen w-full z-10 ' + className}>
      <div onClick={
          ()=>{
            if(forgetPassword) setForgetPassword(false)
            closePopup()}
        } className='w-full h-screen opacity-50 bg-slate-900'></div>

      <div className="w-[300px] sm:w-[500px] rounded absolute opacity-100  bg-white p-5  sm:p-8">
        <img className="w-[150px] mx-auto" loading='lazy' alt="Image" src={logo} />
          { !forgetPassword ? <FormConnexion forgetPassword={()=>{setForgetPassword(true)}}></FormConnexion> : <FormForgetPassword></FormForgetPassword>}
        <div className="text-base">Pas encore inscrit ? <Link href={"/inscription"} className="text-jaune text-base">Créer un compte</Link></div>
      </div>

    </div>
  )
}


function PopupConnected({className=" ", closePopup}){

  const logo = "/logo.png"

  const router = useRouter()
  
  const authentification = useContext(AuthContext)

  async function deconnected(){
    try {
      await deleteCookies()
      closePopup()

      router.push('/connexion')
    } catch (error){
      console.log(error)
    }
     

   
  }

  return(

    
    <div className={'fixed flex justify-center items-center  h-screen w-full z-10 ' + className}>
      <div onClick={
          ()=>{
            closePopup()}
        } className='w-full h-screen opacity-50 bg-slate-900'></div>

      <div className="w-[300px] sm:w-[500px] rounded absolute opacity-100  bg-white p-8">
        <img className="w-[150px] mx-auto" loading='lazy' alt="Image" src={logo} />
        <Link href="/m/compte" className="mt-6 text-base w-full h-[40px] flex justify-center bg-jaune text-center py-2.5 rounded-md mb-2">Aller au compte </Link>
        <button onClick={deconnected} className="mt-6 text-base w-full h-[40px] flex justify-center bg-rouge text-center py-2.5 rounded-md mb-2">se deconnecter </button>
      </div>

    </div>
  )
}




export default function Header(){

const router = useRouter()

const logo = "/logo.png"
const search = "/search.png"
const user = "/user.png"
const shoppingBag = "/shopping-bag.svg"

const [popupOpen, setPopupOpen] = useState('hidden')

//const [connected, setConnected] = useState(false)
const [nbrArticlePanier, setNbrArticlePanier] = useState(0)

const [isSearch, setSearch] = useState('')

  function closePopup(){
  
    setPopupOpen('hidden')
  }

  /*useEffect(() => {
    async function verifieConnexion(){
      try{
        const connexion = await getuser()
        setConnected(connexion)
      }catch (error){
        
      }
      
    }

    verifieConnexion()
    
  },[])*/

  /*useEffect(() => {
    async function nbrArticlePanier(){
      try {
        const response = await getPanier()
        setNbrArticlePanier(response['hydra:member'][0].detailDocuments.length)
      } catch (error){
        console.error(error)
      }
      
    }

    
  },[])*/

  const authentification = useContext(AuthContext)

    return(
      <div className="">
        
        {authentification.connected ? <PopupConnected className={popupOpen} closePopup={closePopup} ></PopupConnected> : <PopupConnexion className={popupOpen} closePopup={closePopup} ></PopupConnexion>}
                
              <div className="w-full flex items-center justify-center h-[56px] bg-[#f6cb05]">
                  <p className="text-center font-normal text-black text-base">
                    Dans le cadre des fêtes de fin d’années, profitez de -40% sur tous nos produits
                  </p>
                </div>
              
        <div className="sticky top-0 px-8 py-1 flex items-center justify-between w-full bg-white">
        
              <Link href={"/"}><img className="w-[150px]" alt="Image" src={logo} /></Link>

            <Link href={"/m/quisommesnous"}>
              <div className="hover:text-jaune max-[870px]:hidden font-sans font-normal text-black text-lg">
                Qui sommes-nous ?
              </div>
            </Link>

            <Link href={"/m/FAQ"}>
              <div className="hover:text-jaune max-[870px]:hidden font-sans font-normal text-black text-lg">
                FAQ
              </div>
            </Link>

            <div className="md:w-[400px] max-md:hidden max-[820px]:w-[400px] min-[870px]:w-[325px] h-[42px] flex border-[0.3px] border-solid rounded-[5px]">
              <div onClick={() =>router.push("/m/recherche/" + isSearch   )} className="w-[52px] bg-[#f6cb05] flex items-center justify-center rounded-[5px_0px_0px_5px] h-[41px] top-0 left-0">
                  <img className="w-[24px] h-[24px]" alt="Search" src={search} />
              </div>
              <div className="font-sans h-[40px font-normal text-black text-lg">
                <input value={isSearch} onChange={(e)=>{setSearch(e.target.value),router.push("/m/recherche/" + e.target.value)}} type="search" placeholder="Rechercher un produit"className="font-sans md:w-[352px] min-[870px]:w-[277px]  text-base p-1 h-full outline-0" ></input>
              </div>
              
            </div>


            <img onClick={() => setPopupOpen("")} className="w-[30px] cursor-pointer h-[30px]" alt="User" src={user} />

            <div className="flex items-center justify-center">
              <Link href={"/m/panier"}>
                <img
                  className="w-[30px] h-[30px]"
                  alt="Shopping bag"
                  src={shoppingBag}
                />
              </Link> 

              {/*<div className="w-[25px] ml-1 flex justify-center items-center h-[25px]  bg-[#f6cb05] rounded-full">
                <div className="font-sans font-normal text-black ">
                  {nbrArticlePanier}
                </div>
    </div>*/}
            </div>
          </div>

          
      

        <div className="px-8 mt-5 py-1">
          <div className="w-[325px] md:hidden h-[42px] flex border-[0.3px] border-solid rounded-[5px]">
                <div onClick={() =>router.push("/m/recherche/" + isSearch)} className="w-[52px] bg-[#f6cb05] flex items-center justify-center rounded-[5px_0px_0px_5px] h-[41px] top-0 left-0">
                    <img className="w-[24px] h-[24px]" alt="Search" src={search} />
                </div>
                <div className="font-sans h-[40px] font-normal text-black text-lg">
                  <input value={isSearch} onChange={(e)=>setSearch(e.target.value)} type="search" placeholder="Rechercher un produit"className="font-sans w-[277px]  text-base p-1 h-full outline-0" ></input>
                </div>
                
              </div>
        </div>
   </div>
    )
}