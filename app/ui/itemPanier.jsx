"use client";

import { useEffect, useState } from "react";
import deleteArticlePanier from "../features/deleteData";
import { useRouter } from "next/navigation";
import { pacthQuantiteProduitPanier } from "../features/pacthData";

export default function ItemPanier({
  nom,
  description,
  montantBrut,
  tva,
  remise,
  montantTTC,
  quantiteProduct,
  imageProduct,
  id,
  montantHt,
  prixUnitaire,
}) {
  const linkImage = "https://api.3dsupplychains.com/" + imageProduct;
  const imgClose = "/closePanier.png";

  const [quantite, setQuantite] = useState(quantiteProduct);
  const [vu, setVu] = useState("");
  const [isDataArticle, setDataArticle] = useState({
    montantBrut: montantBrut,
    tva: tva,
    remise: remise === "NaN" ? 0 : remise,
    montantTTC: montantTTC,
    prixUnitaire: prixUnitaire,
    montantHt: montantHt,
  });

  const router = useRouter();

  async function augmenteQuantite() {
    const response = await pacthQuantiteProduitPanier(id, quantite + 1);
    if (response) {
      setDataArticle({
        montantBrut: parseFloat(response.montantBrut).toLocaleString("fr-FR", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        tva: parseFloat(response.montantTva).toLocaleString("fr-FR", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        remise: response.montantRemise
          ? parseFloat(response.montantRemise).toLocaleString("fr-FR", {
              style: "decimal",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : 0,
        montantTTC: parseFloat(response.montantTtc).toLocaleString("fr-FR", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        prixUnitaire: parseFloat(response.prixUnitaire).toLocaleString(
          "fr-FR",
          {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        ),
        montantHt: parseFloat(response.montantHt).toLocaleString("fr-FR", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      });
      return setQuantite(quantite + 1);
    }
    //console.log(response);
  }

  async function diminuQuantite() {
    if (quantite > 1) {
      const response = await pacthQuantiteProduitPanier(id, quantite - 1);
      if (response) {
        setDataArticle({
          montantBrut: parseFloat(response.montantBrut).toLocaleString(
            "fr-FR",
            {
              style: "decimal",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          ),
          montantHt: parseFloat(response.montantHt).toLocaleString("fr-FR", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
          tva: parseFloat(response.montantTva).toLocaleString("fr-FR", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
          remise: response.montantRemise
            ? parseFloat(response.montantRemise).toLocaleString("fr-FR", {
                style: "decimal",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : 0,
          montantTTC: parseFloat(response.montantTtc).toLocaleString("fr-FR", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
          prixUnitaire: parseFloat(response.prixUnitaire).toLocaleString(
            "fr-FR",
            {
              style: "decimal",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          ),
        });
        return setQuantite(quantite - 1);
      }
      //console.log(response);
    }
  }

  async function supArticlePanier() {
    try {
      const response = await deleteArticlePanier(id);
      setVu("hidden");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <tr className={`border-b border-gray-300 ${vu}`}>
      <td className="w-[200px] p-3 text-base text-left flex items-center">
        <img
          alt="product"
          loading="lazy"
          className="w-16 h-16 mr-2 object-cover"
          src={linkImage}
        />
        <div>
          <div className="font-semibold">{nom}</div>
          <div className="text-sm hidden sm:block">{description}</div>
        </div>
      </td>
      <td className="w-[100px] p-3 text-base text-center font-semibold">
        {isDataArticle.prixUnitaire}
      </td>
      <td className="w-[100px] p-3 text-base text-center font-semibold">
        {isDataArticle.montantBrut}
      </td>
      <td className="w-[100px] p-3 text-base text-center font-semibold">
        {isDataArticle.remise}
      </td>
      <td className="w-[100px] p-3 text-base text-center font-semibold">
        {isDataArticle.montantHt}
      </td>
      <td className="w-[100px] p-3 text-base text-center font-semibold">
        {isDataArticle.tva}
      </td>
      <td className="w-[100px] p-3 text-base text-center">
        <div className="flex items-center justify-center border border-gray-300 p-1">
          <button onClick={diminuQuantite} className="px-2">
            -
          </button>
          {quantite}
          <button onClick={augmenteQuantite} className="px-2">
            +
          </button>
        </div>
      </td>
      <td className="w-[100px] p-3 text-base text-center font-semibold">
        {isDataArticle.montantTTC}
      </td>
      <td className="w-[100px] p-3 text-base text-center">
        <button className="w-[50px] flex justify-center items-center" onClick={supArticlePanier}>
          <img alt="remove" loading="lazy" src={imgClose} />
        </button>
      </td>
    </tr>
  );
}
