"use client";
import { getAdresse, getPanier } from "@/app/features/getData";
import LoadingSpinner from "@/app/ui/loading";
import { useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ItemArticleCheckout } from "@/app/ui/itemArticleCheckout";
import Link from "next/link";
import { pacthPanier, validatePanier } from "@/app/features/pacthData";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

import { motion } from "framer-motion";
import { postAdress } from "@/app/features/postData";
import { PageContext } from "@/app/contextProvider";

export default function CheckoutPage() {

  const pathName = usePathname();

  const thisPage = useContext(PageContext);
  

  useEffect(() => {
    thisPage.setPage(pathName)
  },[]);

  const [dataPanier, setDataPanier] = useState(null);
  const [dataAdresse, setDataAdresse] = useState(null);
  const [stateGenLink, setStateGenLink] = useState(
    "générer un lien de paiement"
  );
  const [linkPaiment, setLinkPaiement] = useState(null);

  const [etatSauvegarde, setEtatSauvegarde] = useState("AJOUTER");
  const [dataAdress, setDataAdress] = useState({
    ville: "",
    commune: "",
    infoSup: "",
    pays: "",
  });
  const [adresseAjoute, setAdresseAjoute] = useState(false);
  const [showAddAdress, setShowAddAdress] = useState("hidden");

  async function actionForm(dataForm) {
    try {
      //console.log(dataForm)
      await postAdress(dataForm);
      router.refresh();
      setDataAdress({ ville: "", commune: "", infoSup: "", pays: "" });
      setAdresseAjoute(true);
    } catch (error) {
      console.error(error);
    } finally {
      setEtatSauvegarde("AJOUT");
    }
  }

  const router = useRouter();

  useEffect(() => {
    async function recupererPanier() {
      try {
        const panier = await getPanier();
        const adresse = await getAdresse();
        //console.log(panier["hydra:member"]);
        if (panier["hydra:member"][0].detailDocuments.length <= 0) {
          return router.replace("/m/panier");
        }

        setDataPanier(panier["hydra:member"]);
        setDataAdresse(adresse["hydra:member"]);

        if (adresse["hydra:member"].length > 0) {
          await updateAdresseLivraison(adresse["hydra:member"][0]["@id"]);
        }
      } catch (error) {
        console.error(error);
        router.back();
      }
    }

    recupererPanier();
  },[adresseAjoute]);

  async function updateAdresseLivraison(e) {
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
        prix={parseFloat(panier.montantTtc)}
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
        <div
          className={"fixed w-full h-full z-10 top-0 left-0 " + showAddAdress}
        >
          <div
            className="absolute w-full h-full bg-slate-900 opacity-45 "
            onClick={() => setShowAddAdress("hidden")}
          ></div>
          <div className="absolute flex justify-center items-center w-full h-full">
            <div className="flex justify-center overflow-scroll p-4 rounded-md w-fit bg-white">
              {!adresseAjoute ? (
                <div>
                  <div className="flex justify-end w-full">
                    <CloseIcon
                      className="cursor-pointer"
                      onClick={() => setShowAddAdress("hidden")}
                    />
                  </div>
                  <form action={() => actionForm(dataAdress)}>
                    <h2 className="font-bold text-lg mt-5">
                      Ajouter une adresse
                    </h2>
                    <div className="w-full mt-5">
                      <div className="text-base">Code postal</div>
                      <input
                        className="w-full border border-gray-300 px-1 py-2"
                        value={dataAdress.pays}
                        onChange={(e) =>
                          setDataAdress({ ...dataAdress, pays: e.target.value })
                        }
                        type="text"
                        placeholder=""
                      ></input>
                    </div>
                    <div className="w-full mt-3.5">
                      <div className="text-base">Ville</div>
                      <input
                        className="w-full border border-gray-300 px-1 py-2"
                        value={dataAdress.ville}
                        placeholder=""
                        onChange={(e) =>
                          setDataAdress({
                            ...dataAdress,
                            ville: e.target.value,
                          })
                        }
                        type="text"
                      ></input>
                    </div>

                    <div className="w-full mt-5">
                      <div className="text-base">Rue</div>
                      <input
                        className="w-full border border-gray-300 px-1 py-2"
                        value={dataAdress.commune}
                        onChange={(e) =>
                          setDataAdress({
                            ...dataAdress,
                            commune: e.target.value,
                          })
                        }
                        type="text"
                        placeholder=""
                      ></input>
                    </div>

                    <div className="w-full mt-5">
                      <div className="text-base">Information additionnel</div>
                      <input
                        className="w-full border border-gray-300 px-1 py-2"
                        value={dataAdress.infoSup}
                        onChange={(e) =>
                          setDataAdress({
                            ...dataAdress,
                            infoSup: e.target.value,
                          })
                        }
                        type="text"
                        placeholder=""
                      ></input>
                    </div>

                    <button
                      onClick={() => setEtatSauvegarde("AJOUT EN COURS...")}
                      type="submit"
                      className="mt-6 text-white w-full bg-rouge text-center py-2.5 rounded-md"
                    >
                      {etatSauvegarde}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-lg flex flex-col p-5 items-center gap-2">
                  <div className="flex justify-end w-full">
                    <CloseIcon
                      className="cursor-pointer"
                      onClick={() => {
                        setShowAddAdress("hidden");
                        setAdresseAjoute(false);
                      }}
                    />
                  </div>
                  <h1>Adresse ajoutée avec succès</h1>
                  <CheckCircleOutlineIcon
                    className=""
                    fontSize="large"
                    color="success"
                  />
                </div>
              )}
            </div>{" "}
          </div>
        </div>

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
              {dataAdresse.length <= 0 && 
                <div className="font-bold text-base text-red-600 ml-2">
                  Ajouter une adresse de livraison à partir de votre compte pour
                  pouvoir valider votre panier*
                </div>
              }
              <div>
                  <select
                    onChange={(e) => updateAdresseLivraison(e.target.value)}
                    className="md:w-[500px] w-full text-base px-1 py-2"
                  >
                    {listAdresse}
                  </select>
                </div>
              

              <button
                onClick={() => setShowAddAdress("")}
                className="text-white text-base mt-5 w-fit px-5   bg-rouge text-center py-3 rounded-md uppercase"
              >
                Ajouter une adresse de livraison
              </button>
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

            {dataAdresse.length > 0 && (
              <div className="flex flex-col mt-5 bg-slate-50 rounded-md p-5 gap-3">
                <div className="flex items-center">
                  <div className="w-[40px] h-[40px] flex justify-center items-center rounded-full bg-jaune">
                    <div>3</div>
                  </div>

                  <div className="font-bold text-base ml-2">
                    Mode de paiement
                  </div>
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
                      <a
                        className="underline text-wrap text-blue-700"
                        href={linkPaiment}
                      >
                        clickez ici pour effectuer le paiement
                      </a>{" "}
                    </div>
                  )}
                </div>
              </div>
            )}
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
              

              <div className="flex justify-between mb-3">
                <div className="text-base ">Total brut</div>
                <div className="text-base font-bold">
                  {parseFloat(dataPanier[0].montantHt)} EURO
                </div>
              </div>

              <div className="flex justify-between mb-3">
                <div className="text-base ">Total remise</div>
                <div className="text-base font-bold">
                  {parseFloat(dataPanier[0].montantRemise)} EURO
                </div>
              </div>

              <div className="flex justify-between mb-3">
                <div className="text-base ">Total hors taxe</div>
                <div className="text-base font-bold">
                  {parseFloat(dataPanier[0].montantHt)} EURO
                </div>
              </div>

              <div className="flex justify-between mb-3">
                <div className="text-base ">Total TVA</div>
                <div className="text-base font-bold">
                  {parseFloat(dataPanier[0].montantTva)} EURO
                </div>
              </div>

              <div className="flex justify-between mb-3">
                <div className="text-base ">Frais de livraison</div>
                <div className="text-base font-bold">
                  {parseFloat(dataPanier[0].montantLivraison)} EURO
                </div>
              </div>

              <div className="flex justify-between mb-8">
                <div className="text-base ">Total TTC</div>
                <div className="text-base font-bold">
                  {parseFloat(dataPanier[0].montantTTC)} EURO
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </motion.div>
    );
  } else {
    return <LoadingSpinner></LoadingSpinner>;
  }
}
