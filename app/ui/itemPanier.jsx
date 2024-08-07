"use client";

import { withCoalescedInvoke } from "next/dist/lib/coalesced-function";
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
  prixUniatire,
  id,
}) {
  const linkImage = "https://api.3dsupplychains.com/" + imageProduct;
  const imgClose = "/closePanier.png";

  const [quantite, setQuantite] = useState(quantiteProduct);
  const [vu, setVu] = useState("");
  const [isDataArticle, setDataArticle] = useState({
    montantBrut: montantBrut,
    tva: tva,
    remise: remise,
    montantTTC: montantTTC,
  });

  const router = useRouter();

  async function augmenteQuantite() {
    const response = await pacthQuantiteProduitPanier(id, quantite + 1);
    if (response) {
      //console.log(response);
      setDataArticle({
        montantBrut: response.montantBrut,
        tva: response.montantTva,
        remise: response.montantRemise ? response.montantRemise : 0,
        montantTTC: response.montantTtc,
      })
      return setQuantite(quantite + 1);
    }

    console.log(response);
  }

  async function diminuQuantite() {
    if (quantite > 1) {
      const response = await pacthQuantiteProduitPanier(id, quantite - 1);
      if (response) {
        //console.log(response);
        setDataArticle({
          montantBrut: response.montantBrut,
          tva: response.montantTva,
          remise: response.montantRemise ? response.montantRemise : 0,
          montantTTC: response.montantTtc,
        })
        return setQuantite(quantite - 1);
      }

      console.log(response);
    }
  }

  async function supArticlePanier() {
    try {
      const response = await deleteArticlePanier(id);
      setVu("hidden");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className={`flex px-2 ${vu}`}>
        <div className="w-[35%] flex sm:flex-row flex-col  items-center sm:justify-start px-1">
          <img
            alt="boeuf"
            loading="lazy"
            className="mr-1"
            width={70}
            srcSet={linkImage}
          ></img>
          <div className="flex flex-col justify-center">
            <div className="text-base font-semibold mt-1 sm:mt-0">
              {nom}
            </div>
            <div className="text-sm hidden sm:block">
              {description}{" "}
            </div>
          </div>
        </div>
        <div className="w-[15%] text-base font-semibold  align-middle flex justify-center items-center">
          <div>{isDataArticle.montantBrut} EURO</div>
        </div>
        <div className="w-[10%] text-base font-semibold  align-middle flex justify-center items-center">
          <div>{isDataArticle.remise ? isDataArticle.remise : 0} EURO</div>
        </div>
        <div className="w-[10%] text-base font-semibold  align-middle flex justify-center items-center">
          <div>{isDataArticle.tva} EURO</div>
        </div>
        <div className="w-[10%] flex justify-center items-center">
          <div className="flex w-[70px] justify-between items-center px-1 border border-gray-300 py-1">
            <button onClick={diminuQuantite}>-</button>
            {quantite}
            <button onClick={augmenteQuantite}>+</button>
          </div>
        </div>
        <div className="w-[15%] flex justify-center text-base items-center">
          <div>{isDataArticle.montantTTC} EURO</div>
        </div>
        <div className="w-[5%] flex justify-center items-center">
          <button onClick={supArticlePanier}>
            <img loading="lazy" srcSet={imgClose}></img>
          </button>
        </div>
      </div>
      <hr className={`${vu}`}></hr>
    </>
  );
}
