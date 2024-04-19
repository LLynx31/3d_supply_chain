'use server'

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { getPanier, getUser } from "./getData"
import { extraitNombre } from "./tools"
import { pacthPanier } from "./pacthData"

export async function postAdress(formData){
    //effectu le requete
    const response = await fetch("https://api.3dsupplychains.com/api/adresses",{
        method: "POST",
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


export async function postAddPanier(product, quantite){

    async function addNoExiste(){
        try {
            const user = await getUser()
            const date  = new Date()
           
            console.log(user['hydra:member'][0].adresses[0]['@id'])
    
            const formData = {
                date: date.toUTCString(),
                user: await user['hydra:member'][0]['@id'],
                detailDocuments: [
                {
                    quantite: quantite,
                    produit: '/api/produits/'+product
                }
                ],
                typeDocument: "/api/type_documents/3",
                paiement: {},
                adresse: await user['hydra:member'][0].adresses[0]['@id']
            }
            //effectu le requete
            const response = await fetch("https://api.3dsupplychains.com/api/documents",{
                method: "POST",
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
                const error =  await response
                throw error
            }
    
            return "Ok"
    
          } 
          catch (error) {
          console.log(error)
          }
    }

    async function addExiste(){

        const formData = {
            quantite: quantite,
            produit : product    
        }

        console.log(formData)

        try {
           
            
            //effectu le requete
            const response = await fetch("https://api.3dsupplychains.com/api/detail_documents",{
                method: "POST",
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
                const error =  await response
                throw error
            }
    
            return "Ok"
    
          } 
          catch (error) {
          console.log(error)
          }
    }

        

        const panier =  await getPanier()
        if(panier['hydra:member'].length <= 0){
            return addNoExiste()
        } else {
            //console.log(panier['hydra:member'][0].detailDocuments)
            return addExiste()
        }

    

    
}


export async function postPassword(formData){
    //effectu le requete
    const response = await fetch("https://api.3dsupplychains.com/api/users/change_password",{
        method: "POST",
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