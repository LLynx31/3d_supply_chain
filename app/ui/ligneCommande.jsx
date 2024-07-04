'use client'

import { useState } from "react"

function DetailsCommande({detailsCommandes,view}){
    
    const listDetailCommande = detailsCommandes.map(commande => 
         <><div className="flex px-2 py-2 mb-4">
            <div className="w-[20%] text-base text-center ">{commande.produit.nom}</div>
            <div className="w-[20%] text-base text-center">{commande.quantite}</div>
            <div className="w-[20%] text-base text-center">{parseInt(commande.prixUnitaire)} EU</div>
            <div className="w-[20%] text-base text-center">{commande.montantRemise}</div>
            <div className="w-[20%] text-base text-center">{commande.montantTtc}</div>
        </div><hr></hr></>
    )

    //console.log(listDetailCommande)

    
    return (
        <div className={"ml-4 mb-10 " + view}>
            <div className="bg-teal-100 flex px-2 py-2 mb-4">
                <div className="w-[20%] text-base text-center ">produit</div>
                <div className="w-[20%] text-base text-center">quantite</div>
                <div className="w-[20%] text-base text-center">prix unitaire</div>
                <div className="w-[20%] text-base text-center">remise</div>
                <div className="w-[20%] text-base text-center">total</div>
            </div>
            {listDetailCommande}
        </div>
    )
}



export default function LigneCommandes({numCommande,date,total,statut,detailsCommandes,adresse}){

    const [view, setView] = useState({etat:'hidden',action:'details'})

    return(
        <>
        <div className="border-b border-b-slate-200 flex px-2 py-2 mb-4">
            <div className="w-[15%] text-base text-center ">{numCommande}</div>
            <div className="w-[15%] text-base text-center">{adresse.pays} {adresse.ville} {adresse.commune}</div>
            <div className="w-[15%] text-base text-center">{date}</div>
            <div className="w-[15%] text-base text-center">{total} EU</div>
            <div className="w-[15%] text-base text-center">{statut}</div>
            <div className="w-[15%] text-base text-center"><button className="bg-red-100 rounded-md py-1 px-2 text-red-500 text-sm sm:text-base " onClick={()=>{
                if(view.etat == 'hidden'){
                    return setView({etat:'',action:'fermer'})
                }

                return setView({etat:'hidden',action:'details'})
            }}>{view.action}</button></div>
        </div>
        <DetailsCommande detailsCommandes={detailsCommandes} view={view.etat}></DetailsCommande>
        </>
    )
}