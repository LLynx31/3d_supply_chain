'use server'

import { cookies } from "next/headers"
import { extraitNombre } from "./tools"
import { redirect } from "next/navigation"

export default async function deleteArticlePanier(id){
    const idParse =  extraitNombre(id)
    //effectu le requete
    const response = await fetch("https://api.3dsupplychains.com/api/detail_documents/" + idParse +"/delete",{
        headers: {
            Authorization: 'Bearer '+ cookies().get('session').value,
            "Content-Type": "application/json",
        }
    })


    if (!response.ok){
        const error =  await response.json()
        throw error
    }

    redirect("/m/panier")
}