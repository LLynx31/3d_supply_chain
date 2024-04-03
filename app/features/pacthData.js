'use server'

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { extraitNombre } from "./tools"
import Panier from "../m/panier/page"

export async function pacthAdress(formData,adresse){

    const idAdresse = extraitNombre(adresse)
    //effectu le requete
    const response = await fetch("https://api.3dsupplychains.com/api/adresses/" + idAdresse,{
        method: "PATCH",
        mode: "cors",
        cache: "no-cache",
        headers: {
            Authorization: 'Bearer '+ cookies().get('session').value,
            "Content-Type": "application/json",
        },
            
        redirect: "follow",
        referrerPolicy: "origin",
        body: JSON.stringify(formData),
      
    })

    //on verifie qu'il n'y pas d'erreur
    if (!response.ok){
        const error =  await response.json()
        throw error
    }

    return "Ok"
}


export async function pacthUser(formData,user){
    console.log(user)
    const idUser = extraitNombre(user)
    console.log(idUser)
    //effectu le requete
    const response = await fetch("https://api.3dsupplychains.com/api/users/" + idUser,{
        method: "PATCH",
        mode: "cors",
        cache: "no-cache",
        headers: {
            Authorization: 'Bearer '+ cookies().get('session').value,
            "Content-Type": "application/json",
        },
            
        redirect: "follow",
        referrerPolicy: "origin",
        body: JSON.stringify(formData),
      
    })

    //on verifie qu'il n'y pas d'erreur
    if (!response.ok){
        const error =  await response.json()
        throw error
    }

    return "Ok"
}

export async function pacthPanier(formData,panier){
    console.log(panier)
    const idPanier = extraitNombre(user)
    console.log(idPanier)
    //effectu le requete
    const response = await fetch("https://api.3dsupplychains.com/api/users/" + idPanier,{
        method: "PATCH",
        mode: "cors",
        cache: "no-cache",
        headers: {
            Authorization: 'Bearer '+ cookies().get('session').value,
            "Content-Type": "application/json",
        },
            
        redirect: "follow",
        referrerPolicy: "origin",
        body: JSON.stringify(formData),
      
    })

    //on verifie qu'il n'y pas d'erreur
    if (!response.ok){
        const error =  await response.json()
        throw error
    }

    return "Ok"
}
