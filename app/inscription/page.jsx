'use client'

import { Donegal_One } from "next/font/google"
import { useState } from "react"
import { postData } from "../features/inscription"

function FormInscription({succesIsGood}){

    const [data, setData] = useState({
        nom: "",
        prenoms: "",
        telephone1: "",
        telephone2: "",
        email: "",
        typeUser: "/api/type_users/1",
        plainPassword: ""
    })

    function updateNom(dataUpate){
        setData(
            {
                ...data,
                 nom: dataUpate
            }
            
        )
    }

    function updatePrénom(dataUpate){
        setData(
            {
                ...data,
                 prenoms: dataUpate
            }
            
        )
    }


    function updateTelephone1(dataUpate){
        setData(
            {
                ...data,
                 telephone1: dataUpate
            }
            
        )
    }


    function updateTelephone2(dataUpate){
        setData(
            {
                ...data,
                 telephone2: dataUpate
            }
            
        )
    }


    function updateEmail(dataUpate){
        setData(
            {
                ...data,
                 email: dataUpate
            }
            
        )
    }


    function updatePlainPassword(dataUpate){
        setData(
            {
                ...data,
                 plainPassword: dataUpate
            }
            
        )
    }


    
      

    return(
        <>
            <h1 className="text-xl font-bold text-center">Création de compte</h1>

            <p className="text-lg text-center ">Veuillez remplir le formulaire</p>

            <form>
                <div className="w-full mt-5">
                    <div className="text-base">Nom </div>
                    <input name="nom" value={data.nom} onChange={(e) => updateNom(e.target.value)} className="w-full border border-gray-300 px-1 py-2" type="text" placeholder="Sagoe"></input>
                </div>  

                <div className="w-full mt-5">
                    <div className="text-base">Prénom </div>
                    <input name="prenom"  value={data.prenoms} onChange={(e) => updatePrénom(e.target.value)}  className="w-full border border-gray-300 px-1 py-2" type="text" placeholder="Sagoe"></input>
                </div>    

                <div className="w-full mt-5">
                    <div className="text-base">Email </div>
                    <input name="email" value={data.email} onChange={(e) => updateEmail(e.target.value)}  className="w-full border border-gray-300 px-1 py-2" type="email" placeholder="Sagoe"></input>
                </div> 
                

                <div className="w-full mt-5">
                    <div className="text-base">Mot de passe </div>
                    <input  name="plainPassword" value={data.plainPassword} onChange={(e) => updatePlainPassword(e.target.value)}  className="w-full border border-gray-300 px-1 py-2" type="password" placeholder="Sagoe"></input>
                </div>  


                <div className="w-full mt-5">
                    <div className="text-base">Confirmation mot de passe </div>
                    <input name="plainPassword" className="w-full border border-gray-300 px-1 py-2" type="password" placeholder="Sagoe"></input>
                </div> 

                <div className="w-full mt-5">
                    <div className="text-base">téléphone 1 </div>
                    <input name="telephone1" value={data.telephone1} onChange={(e) => updateTelephone1(e.target.value)}  className="w-full border border-gray-300 px-1 py-2" type="text" placeholder="Sagoe"></input>
                </div> 

                <div className="w-full mt-5">
                    <div className="text-base">téléphone 2 </div>
                    <input name="telephone2" value={data.telephone2} onChange={(e) => updateTelephone2(e.target.value)}  className="w-full border border-gray-300 px-1 py-2" type="text" placeholder="Sagoe"></input>
                </div> 

                <button onClick={() => postData("https://api.3dsupplychains.com/api/users", data).finally((donnees)=> console.log(donnees))} className="mt-6 text-white w-full bg-rouge text-center py-2.5 rounded-md">VALIDER</button>  
            </form> 
        </>
   
    )
}


function SuccesInscription(){
    const imgDangerCircle = "/Danger_Circle.png"
    return(
        <div className="flex flex-col py-20">
            <h1 className="text-xl font-bold text-center">Création de compte</h1>
            <p className="text-base text-center mb-3">Confirmation du compte</p>
            <div className={"flex py-2 justify-center items-center px-2 bg-teal-50 rounded-xl w-fit transition-[display] "}>
                <img className="mr-2" loading="lazy" srcSet={imgDangerCircle}></img>
                <div className="text-teal-500">Vous avez reçu un mail, veuillez s’il vous plaît cliquer sur le lien pour la vérification de votre compte</div>
            </div>

            <button className="mt-6 text-white w-full bg-rouge text-center py-2.5 rounded-md font-bold tracking-wider">Renvoyer</button>

            <button onClick={()=>{document.location.href = "/"}} className="mt-6 text-base w-full bg-jaune text-center py-2.5 rounded-md mb-2 font-bold tracking-wider">Retourner à l'acceuil</button>
        </div>
    )
}


export default function InscriptionPage(){
    const bannerImg = '/banner_home.jpeg'

    const [succes, setSucces] = useState(false) 


    return (
        <div className="flex mt-8 mb-20"> 
            <img loading="lazy" srcSet={bannerImg} className="h-[570px] w-[700px] mr-10">
            </img>

            <div className="w-full">{!succes ? <FormInscription succesIsGood={()=>setSucces(true)}></FormInscription> : <SuccesInscription></SuccesInscription> }</div>
        </div>
        )
     

    
}

