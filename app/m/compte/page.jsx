'use server'

import { getCommandes, getUser } from "@/app/features/getData"
import LoadingSpinner from "@/app/ui/loading"
import ComponentPage from "./ComponentsPage"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { deleteCookies } from "@/app/features/authentification"



export default async function PageCompte(){

    //console.log(cookies().get('session').value)

    try {


        const user = await getUser()
        const commandes = await getCommandes()
        console.log(commandes['hydra:member'])
        //console.log(user["hydra:member"][0]['@id'])
        return <ComponentPage data={user} commandes={commandes['hydra:member']}></ComponentPage>

    } catch(error) {

        if(error.code == 401){
            redirect('/m/compte')
        }

        return(
            <div className="text-center mt-10">Erreur lors du chargement des données</div>
        )
    }

    
}