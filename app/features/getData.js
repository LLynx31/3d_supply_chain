'use server'

import { cookies } from "next/headers"

// recupération de l'utilisateur
export async function getUser(){

    //effectu le requete
    const response = await fetch("https://api.3dsupplychains.com/api/users?page=1",{
        headers: {Authorization: 'Bearer '+ cookies().get('session')?.value}
      
    })


    if (!response.ok){
        const error =  await response.json()
        throw error
    }

    return response.json()


}


export async function getPanier(){

    //effectu le requete
    const response = await fetch("https://api.3dsupplychains.com/api/documents?page=1",{
        headers: {Authorization: 'Bearer '+ cookies().get('session')?.value}
      
    })


    if (!response.ok){
        const error =  await response.json()
        throw error
    }

    return response.json()


}

export async function getProductSearch(query){
    //effectu le requete
    const response = await fetch("https://api.3dsupplychains.com/api/produits?page=1&nom=" + query)


    if (!response.ok){
        const error =  await response.json()
        throw error
    }

    return response.json()
}




export async function getAdresse(){
    //effectu le requete
    const response = await fetch("https://api.3dsupplychains.com/api/adresses?page=1" ,{
        headers: {Authorization: 'Bearer '+ cookies().get('session')?.value}
      
    })


    if (!response.ok){
        const error =  await response.json()
        throw error
    }

    return response.json()
}

export async function getAllPromotion(){
    //effectu le requete
    const response = await fetch("https://api.3dsupplychains.com/api/promotions?typePromotion.code[]=PAR_CATEGORIE&typePromotion.code[]=PAR_SOUS_CATEGORIE")


    if (!response.ok){
        const error =  await response.json()
        throw error
    }

    return response.json()
}

export async function getProductPromotion(){
    //effectu le requete
    const response = await fetch("https://api.3dsupplychains.com/api/promotions?typePromotion.code[]=PAR_CATEGORIE&typePromotion.code[]=PAR_SOUS_CATEGORIE")


    if (!response.ok){
        const error =  await response.json()
        throw error
    }

    return response.json()
}

