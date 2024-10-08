"use client";

import { useState } from "react";

function DetailsCommande({
  detailsCommandes,
  montantLivraison,
  montantHt,
  montantTva,
  montantBrut,
  montantRemise,
  total,
  view,
  setView,
}) {
  const listDetailCommande = detailsCommandes.map((commande) => (
    <div key={commande.produit.nom} className="w-fit sm:w-auto">
      <div className=" flex flex-row px-2 py-2 mb-4">
        <div className="w-[100px] sm:w-[12.5%] py-0 text-base text-center ">
          {commande.produit.nom}
        </div>

        <div className="w-[100px] sm:w-[12.5%] py-0 text-base text-center">
          {commande.quantite}
        </div>

        <div className="w-[100px] sm:w-[12.5%] py-0 text-base text-center">
          {parseFloat(commande.prixUnitaire).toLocaleString("fr-FR", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
        </div>
        <div className="w-[100px] sm:w-[12.5%] py-0 text-base text-center">
          {parseFloat(commande.montantBrut).toLocaleString("fr-FR", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
        </div>
        <div className="w-[100px] sm:w-[12.5%] py-0 text-base text-center">
          {commande.montantRemise
            ? parseFloat(commande.montantRemise).toLocaleString("fr-FR", {
                style: "decimal",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : 0}{" "}
        </div>
        <div className="w-[100px] sm:w-[12.5%] py-0 text-base text-center">
          {commande.montantRemise
            ? parseFloat(commande.montantHt).toLocaleString("fr-FR", {
                style: "decimal",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : 0}{" "}
        </div>
        <div className="w-[100px] sm:w-[12.5%] py-0 text-base text-center">
          {parseFloat(commande.montantTva).toLocaleString("fr-FR", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
        </div>
        <div className="w-[100px] sm:w-[12.5%] py-0 text-base text-center">
          {parseFloat(commande.montantTtc).toLocaleString("fr-FR", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          EURO
        </div>
      </div>
      <hr></hr>
    </div>
  ));

  //console.log(listDetailCommande)

  return (
    <div
      className={"fixed w-full h-full z-10 top-0 left-0 " + view.etat}
      onClick={() => {
        if (view.etat == "hidden") {
          return setView({ etat: "", action: "fermer" });
        }

        return setView({ etat: "hidden", action: "Details" });
      }}
    >
      <div className="absolute w-full h-full bg-slate-900 opacity-45"></div>
      <div className="absolute flex justify-center items-center w-full h-full">
        <div className="flex justify-center overflow-scroll mx-2 sm:w-[800px] p-4 rounded-md sm:min-h-[300px] sm:max-h-[600px] bg-white w-full">
          <div className={"mb-10 flex-col flex w-full "}>
            <h1 className="text-base">Informations produits</h1>
            <hr className="mb-5"></hr>
            <div className="bg-teal-50 w-fit  sm:w-auto flex  flex-row px-2 py-2 mb-4">
              <div className="w-[100px]  sm:w-[12.5%] font-bold text-blue-700  py-3 sm:py-0 text-base text-center ">
                Produit
              </div>
              <div className="w-[100px] sm:w-[12.5%] font-bold text-blue-700 py-3 sm:py-0 text-base text-center">
                Quantite
              </div>
              <div className="w-[100px]  sm:w-[12.5%] font-bold text-blue-700 py-3 sm:py-0 text-base text-center">
                Prix unitaire (euro)
              </div>
              <div className="w-[100px]  sm:w-[12.5%] font-bold text-blue-700 py-3 sm:py-0 text-base text-center">
                Montant brut
              </div>
              <div className="w-[100px]  sm:w-[12.5%] font-bold text-blue-700 py-3 sm:py-0 text-base text-center">
                Remise
              </div>
              <div className="w-[100px]  sm:w-[12.5%] font-bold text-blue-700 py-3 sm:py-0 text-base text-center">
                Montant hors taxe
              </div>
              <div className="w-[100px]  sm:w-[12.5%] font-bold text-blue-700 py-3 sm:py-0 text-base text-center">
                TVA
              </div>
              <div className="w-[100px]  sm:w-[12.5%] font-bold text-blue-700 py-3 sm:py-0 text-base text-center">
                Total
              </div>
            </div>
            {listDetailCommande}
            <h1 className="text-base mt-5">
              Informations détaillées sur la commande
            </h1>
            <hr className="mb-5"></hr>
            <table className="min-w-full text-base border-collapse border border-gray-300">
              <tbody>
                <tr className="bg-white">
                  <th className="text-left text-base p-2 border-b border-gray-300 text-blue-700">
                    Montant brut :
                  </th>
                  <td className="text-gray-500 p-2 border-b border-gray-300">
                    {montantBrut} EURO
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <th className="text-left text-base p-2 border-b border-gray-300 text-blue-700">
                    Montant Remise :
                  </th>
                  <td className="text-gray-500 p-2 border-b border-gray-300">
                    {montantRemise} EURO
                  </td>
                </tr>
                <tr className="bg-white">
                  <th className="text-left text-base p-2 border-b border-gray-300 text-blue-700">
                    Montant hors taxe :
                  </th>
                  <td className="text-gray-500 p-2 border-b border-gray-300">
                    {montantHt} EURO
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <th className="text-left text-base p-2 border-b border-gray-300 text-blue-700">
                    Montant TVA :
                  </th>
                  <td className="text-gray-500 p-2 border-b border-gray-300">
                    {montantTva} EURO
                  </td>
                </tr>
                <tr className=" bg-white">
                  <th className="text-left text-base p-2 border-b border-gray-300 text-blue-700">
                    Montant livraison :
                  </th>
                  <td className="text-gray-500 p-2 border-b border-gray-300">
                    {montantLivraison} EURO
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <th className="text-left text-base p-2 border-b border-gray-300 text-blue-700">
                    Montant TTC :
                  </th>
                  <td className="text-gray-500 p-2 border-b border-gray-300">
                    {total} EURO
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
  const [view, setView] = useState({
    etat: "hidden",
    action: "Détails produits",
  });

  return (
    <>
      <tr className="border-b border-b-slate-200">
        <td className="w-[100px] sm:w-[16%] text-base text-center px-2 py-2 bg-gray-50">
          {numCommande}
        </td>
        <td className="w-[100px] sm:w-[16%] text-base text-center px-2 py-2 bg-white">
          {adresse.pays} {adresse.ville} {adresse.commune}
        </td>
        <td className="w-[100px] sm:w-[16%] text-base text-center px-2 py-2 bg-gray-50">
          {date}
        </td>
        <td className="w-[100px] sm:w-[16%] text-base text-center px-2 py-2 bg-white">
          {total} EU
        </td>
        <td className="w-[100px] sm:w-[16%] text-base text-center px-2 py-2 bg-gray-50">
          {statut}
        </td>
        <td className="w-[100px] sm:w-[16%] text-base text-center px-2 py-2 bg-white">
          <button
            className="bg-red-100 rounded-md py-1 px-2 text-red-600 text-sm"
            onClick={() => {
              if (view.etat === "hidden") {
                return setView({ etat: "", action: "Fermer" });
              }
              return setView({ etat: "hidden", action: "Détails produits" });
            }}
          >
            {view.action}
          </button>
        </td>
      </tr>

      {view.etat === "" && (
        <tr>
          <td colSpan="6" className="bg-gray-50">
            <DetailsCommande
              detailsCommandes={detailsCommandes}
              view={view}
              montantBrut={montantBrut}
              montantHt={montantHt}
              montantLivraison={montantLivraison}
              montantTva={montantTva}
              montantRemise={montantTva}
              key={numCommande}
              total={total}
              setView={setView}
            />
          </td>
        </tr>
      )}
    </>
  );
}

