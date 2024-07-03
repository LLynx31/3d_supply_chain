"use client";
import ItemPanier from "../../ui/itemPanier";
import { getAdresse, getPanier } from "@/app/features/getData";
import LoadingSpinner from "@/app/ui/loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ItemArticleCheckout } from "@/app/ui/itemArticleCheckout";
import Link from "next/link";
import { pacthPanier, validatePanier } from "@/app/features/pacthData";

import { motion } from "framer-motion";

export default function CheckoutPage() {
  const [dataPanier, setDataPanier] = useState(null);
  const [dataAdresse, setDataAdresse] = useState(null);
  const [stateGenLink, setStateGenLink] = useState(
    "générer un lien de paiement"
  );
  const [linkPaiment, setLinkPaiement] = useState(null);

  const [ajoutReussi, setAjoutReussi] = useState("hidden");

  const imgDangerCircle = "/Danger_Circle.png";
  const imgClose = "/x.png";

  const router = useRouter();

  useEffect(() => {
    async function recupererPanier() {
      try {
        const panier = await getPanier();
        const adresse = await getAdresse();
        //console.log(panier['hydra:member'])
        if (panier["hydra:member"][0].detailDocuments.length <= 0) {
          return router.replace("/m/panier");
        }

        setDataPanier(panier["hydra:member"]);
        setDataAdresse(adresse["hydra:member"]);

      } catch (error) {
        console.error(error);
        router.back();
      }
    }

    recupererPanier();
  }, []);

  async function updateAdresseLivraison(e) {
    //preparation des données
    /*let data = []
        for (let index = 1; index <= 4; index++) {
            data.push(e.split("*")[index]);
        }
        const formData = {
            pays: data[0],
            ville: data[1],
            commune: data[2],
            description: data[3]

        }
        const idAdresse = e.split("*")[0]
        console.log(formData)
        //execution de la requete*/
    try {
      const response = await pacthPanier(e);
      //console.log(response)
    } catch (error) {
      console.log(error);
    }
  }

  async function validation() {
    try {
      setStateGenLink("génération du lien ...");
      const response = await validatePanier();
      setLinkPaiement(response.payLink);
      setStateGenLink("générer un lien de paiement");
    } catch (error) {
      console.log(error);
    }
  }

  if (dataPanier) {
    const listPanier = dataPanier[0].detailDocuments.map((panier) => (
      <ItemArticleCheckout
        key={panier["@id"]}
        image={panier.produit.imageProduits[0].path}
        nom={panier.produit.nom}
        prix={parseInt(panier.prixUnitaire)}
        qte={panier.quantite}
      ></ItemArticleCheckout>
    ));

    const listAdresse = dataAdresse.map((adresse) => (
      <option value={adresse["@id"]} key={adresse["@id"]}>
        {adresse.pays}, {adresse.ville}, {adresse.commune} {adresse.description}
      </option>
    ));

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-8 px-3 flex-col flex  sm:px-8 pt-5"
      >
        {/* <div className={"fixed right-7 flex py-2 justify-center px-2 bg-teal-100 rounded-xl w-fit transition-[display] " + ajoutReussi }>
                    <img className="mr-2" loading="lazy" srcSet={imgDangerCircle}></img>
                    <div className="text-base"> commande validé avec succès</div>
                    <button onClick={()=> setAjoutReussi('hidden')}><img loading="lazy" srcSet={imgClose}></img></button>
        </div>*/}
        <h1 className="text-center text-xl font-bold">checkout</h1>
        <hr className="w-full"></hr>
        <div className="mt-3 flex gap-5  flex-col lg:flex-row">
          <div className="w-full min-h-[250px]">
            <div className="flex flex-col bg-slate-50 rounded-md p-5 gap-3">
              <div className="flex items-center">
                <div className="w-[40px] h-[40px] flex justify-center items-center rounded-full bg-jaune">
                  <div>1</div>
                </div>

                <div className="font-bold text-base ml-2">
                  Adresse de livraison
                </div>
              </div>

              <div>
                <select
                  onChange={(e) => updateAdresseLivraison(e.target.value)}
                  className="md:w-[500px] w-full text-base px-1 py-2"
                >
                  {listAdresse}
                </select>
              </div>
            </div>

            <div className="flex flex-col mt-5 bg-slate-50 rounded-md p-5 gap-3">
              <div className="flex items-center">
                <div className="w-[40px] h-[40px] flex justify-center items-center rounded-full bg-jaune">
                  <div>2</div>
                </div>

                <div className="font-bold text-base ml-2">
                  Récapitulatif des articles
                </div>
              </div>

              <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-5">
                {listPanier}
              </div>
            </div>

            <div className="text-center mt-5">
              <Link href={"/m/panier"} className="text-rouge text-base">
                modifier le panier
              </Link>
            </div>

            <div className="flex flex-col mt-5 bg-slate-50 rounded-md p-5 gap-3">
              <div className="flex items-center">
                <div className="w-[40px] h-[40px] flex justify-center items-center rounded-full bg-jaune">
                  <div>3</div>
                </div>

                <div className="font-bold text-base ml-2">Mode de paiement</div>
              </div>

              <div className="text-base ml-3">
                <button
                  onClick={validation}
                  className="text-white text-base mt-5 w-fit px-5 mx-auto  bg-rouge text-center py-3 rounded-md uppercase"
                >
                  {stateGenLink}
                </button>
                {linkPaiment && (
                  <div className="text-base ml-1 mt-5">
                    clickez{" "}
                    <a className="underline text-wrap" href={linkPaiment}>
                      ici
                    </a> {" "}
                    pour effectuer le paiement
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="  border rounded-lg border-gray-200 px-3 py-5 h-fit ">
            <div className="text-base">Entrez votre code promo</div>

            <div className="w-full mt-5 flex ">
              <input className="block w-[200px] text-base border border-gray-300 p-1"></input>

              <button className="bg-black text-white px-3 text-base ml-2">
                SOUMETTRE
              </button>
            </div>

            <hr className="mt-8"></hr>

            <div className="mt-8">
              {/*<div className="flex justify-between mb-3">
                <div className="text-base ">sous-total</div>
                <div className="text-base font-bold">
                  {parseInt(dataPanier[0].montantHt)} EURO
                </div>
              </div>*/}

              <div className="flex justify-between mb-3">
                <div className="text-base ">livraison de 5%</div>
                <div className="text-base font-bold">
                  {(parseFloat(dataPanier[0].montantHt) * 5) / 100} EURO
                </div>
              </div>

              <div className="flex justify-between mb-8">
                <div className="text-base ">total</div>
                <div className="text-base font-bold">
                  {parseFloat(dataPanier[0].montantHt) + (parseFloat(dataPanier[0].montantHt) * 5) / 100} EURO
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*<button
          onClick={validation}
          className="text-white text-base mt-10 w-fit px-5 mx-auto  bg-rouge text-center py-3 rounded-md uppercase"
        >
          {stateGenLink}
        </button>
        <div className="text-base text-center mt-5">
          clickez sur le lien de paiement
          <a className="underline" href={linkPaiment}>
            {linkPaiment}
          </a>
    </div>*/}
      </motion.div>
    );
  } else {
    return <LoadingSpinner></LoadingSpinner>;
  }
}
