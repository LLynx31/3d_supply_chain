'use server'

import { cookies } from "next/headers"

// recupération de l'utilisateur
export async function getUser(){

    //effectu le requete
    const response = await fetch("https://api.3dsupplychains.com/api/users?page=1",{
        headers: {Authorization: 'Bearer '+ cookies().get('session')?.value}
      
    })

    // on vérifie la reponse
    if (!response.ok){
        
        //si elle est mauvaise on déclenche une erreur
        const error =  await response.json()
        throw error
    }

    //on retourne la réponses
    return await response.json()


}


export async function getPanier(){

    //effectu le requete
    const response = await fetch("https://api.3dsupplychains.com/api/documents?page=1&typeDocument=%2Fapi%2Ftype_documents%2F3",{
        headers: {Authorization: 'Bearer '+ cookies().get('session')?.value}
      
    })


    if (!response.ok){
        const error =  await response.json()
        throw error
    }

    return response.json()


}



export async function getCommandes(){

    //effectu le requete
    const response = await fetch("https://api.3dsupplychains.com/api/documents?page=1&typeDocument=%2Fapi%2Ftype_documents%2F2",{
        headers: {Authorization: 'Bearer '+ cookies().get('session')?.value}
      
    })


    if (!response.ok){
        const error =  await response.json()
        throw error
    }

    return await response.json()


}

export async function getProductSearch(query,page){
    //effectu le requete
    const response = await fetch("https://api.3dsupplychains.com/api/produits?nom=" + query + "&page=" + page)


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

