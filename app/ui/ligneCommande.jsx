"use client";

import { useState } from "react";

function DetailsCommande({ detailsCommandes, view }) {
  const listDetailCommande = detailsCommandes.map((commande) => (
    <div key={commande.produit.nom} className="w-[60%] sm:w-auto">
      <div className=" flex flex-col sm:flex-row px-2 py-2 mb-4">
        <div className="sm:w-[20%] py-3 sm:py-0 text-base text-center ">
          {commande.produit.nom}
        </div>
        
        <div className="sm:w-[10%] py-3 sm:py-0 text-base text-center">{commande.quantite}</div>
        <div className="sm:w-[20%] py-3 sm:py-0 text-base text-center">
          {parseFloat(commande.montantBrut).toLocaleString("fr-FR", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} EURO
        </div>
        <div className="sm:w-[20%] py-3 sm:py-0 text-base text-center">
          {commande.montantRemise ? parseFloat(commande.montantRemise).toLocaleString("fr-FR", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) : 0} EURO
        </div>
        <div className="sm:w-[20%] py-3 sm:py-0 text-base text-center">
          {parseFloat(commande.montantTva).toLocaleString("fr-FR", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} EURO
        </div>
        <div className="sm:w-[20%] py-3 sm:py-0 text-base text-center">
          {parseFloat(commande.montantTtc).toLocaleString("fr-FR", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} EURO
        </div>
      </div>
      <hr></hr>
    </div>
  ));

  //console.log(listDetailCommande)

  return (
    <div className={"ml-4 mb-10 flex-row sm:flex-col flex w-full " + view}>
      <div className="bg-teal-100 w-[40%] sm:w-auto flex flex-col sm:flex-row px-2 py-2 mb-4">
        <div className="sm:w-[20%] py-3 sm:py-0 text-base text-center ">Produit</div>
        <div className="sm:w-[10%] py-3 sm:py-0 text-base text-center">Quantite</div>
        <div className="sm:w-[20%] py-3 sm:py-0 text-base text-center">Montant brut</div>
        <div className="sm:w-[20%] py-3 sm:py-0 text-base text-center">Remise</div>
        <div className="sm:w-[20%] py-3 sm:py-0 text-base text-center">TVA</div>
        <div className="sm:w-[20%] py-3 sm:py-0 text-base text-center">Total</div>
      </div>
      {listDetailCommande}
    </div>
  );
}

export default function LigneCommandes({
  numCommande,
  date,
  total,
  statut,
  detailsCommandes,
  adresse,
  montantLivraison,
  montantHt,
  montantTva,
  montantBrut,
  montantRemise,
}) {
  const [view, setView] = useState({ etat: "hidden", action: "details produits" });

  return (
    <>
      <div className="border-b border-b-slate-200 flex px-2 py-2 mb-4">
        <div className="w-[15%] text-base text-center ">{numCommande}</div>
        <div className="w-[20%] text-base text-center">
          {adresse.pays} {adresse.ville} {adresse.commune}
        </div>
        <div className="w-[20%] text-base text-center">{date}</div>
    
        <div className="w-[15%] text-base text-center">{total} EU</div>
        <div className="w-[15%] text-base text-center">{statut}</div>
        <div className="w-[15%] text-base text-center">
          <button
            className="bg-red-100 rounded-md py-1 px-2 text-red-500 text-sm sm:text-base "
            onClick={() => {
              if (view.etat == "hidden") {
                return setView({ etat: "", action: "fermer" });
              }

              return setView({ etat: "hidden", action: "details produits" });
            }}
          >
            {view.action}
          </button>
        </div>
      </div>
      <div className="flex flex-col p-5 rounded-md border-gray-300 border mb-5 gap-2 flex-wrap">
      <h1 className="text-lg font-bold uppercase mb-3">Informations détaillées sur la commande N° {numCommande}</h1>
        <div className="text-base ">
          Montant livraison :{" "}
          <span className="text-gray-500">{montantLivraison} EURO,</span>
        </div>
        <div className="text-base">
          Montant brut : <span className="text-gray-500">{montantBrut} EURO,</span>{" "}
        </div>
        <div className="text-base ">
          Montant Remise : <span className="text-gray-500">{montantRemise} EURO,</span>
        </div>
        <div className="text-base ">
          Montant hors taxe : <span className="text-gray-500">{montantHt} EURO,</span>
        </div>
        <div className="text-base ">
          Montant TVA : <span className="text-gray-500">{montantTva} EURO,</span>
        </div>
        <div className="text-base ">
          Montant TTC : <span className="text-gray-500">{total} EURO,</span>
        </div>
      </div>

      <DetailsCommande
        detailsCommandes={detailsCommandes}
        view={view.etat}
      ></DetailsCommande>
    </>
  );
}
