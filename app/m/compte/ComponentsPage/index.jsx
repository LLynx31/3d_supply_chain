"use client";

import { useContext, useEffect, useState } from "react";
import { AddAdress, Adresse } from "../../../ui/adresseItem";
import { pacthUser } from "@/app/features/pacthData";
import { postPassword } from "@/app/features/postData";

import { motion } from "framer-motion";
import LigneCommandes from "@/app/ui/ligneCommande";
import { extraitNombre, formatISODate } from "@/app/features/tools";
import { usePathname } from "next/navigation";
import { PageContext } from "@/app/contextProvider";

export default function ComponentPage({ data, commandes }) {
  const pathName = usePathname();

  const thisPage = useContext(PageContext);

  useEffect(() => {
    thisPage.setPage(pathName);
  });

  const [swipeOption, setSwipeOption] = useState("infoPerso");
  const [ajoutReussi, setAjoutReussi] = useState("hidden");
  const [ajoutPassword, setAjoutPassword] = useState("hidden");

  const [etatSauvegarde, setEtatSauvegarde] = useState("SAUVEGARDER");

  const imgDangerCircle = "/Danger_Circle.png";
  const imgClose = "/x.png";

  const [dataInfoSup, setDataInfoSup] = useState({
    id: data["hydra:member"][0]["@id"],
    nom: data["hydra:member"][0].nom,
    prenoms: data["hydra:member"][0].prenoms,
    email: data["hydra:member"][0].email,
    telephone1: data["hydra:member"][0].telephone1,
    telephone2: data["hydra:member"][0].telephone2,
  });

  const [dataPassword, setDataPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });

  async function changeInfo() {
    try {
      const response = await pacthUser(dataInfoSup, dataInfoSup.id);
      setAjoutReussi("");
    } catch (error) {
    } finally {
      setEtatSauvegarde("SAUVEGARDER");
    }
  }

  async function changePassword() {
    try {
      const response = await postPassword(dataPassword);
      setAjoutPassword("");
    } catch (error) {
      console.log(error);
    } finally {
      setEtatSauvegarde("SAUVEGARDER");
    }
  }

  const listLigneCommande = commandes.map((commande) => {
    //console.log(commande);
    return (
      <LigneCommandes
        key={commande["@id"]}
        adresse={commande.adresse}
        detailsCommandes={commande.detailDocuments}
        numCommande={extraitNombre(commande["@id"])}
        total={parseFloat(commande.montantTTC).toLocaleString("fr-FR", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        montantLivraison={parseFloat(commande.montantLivraison).toLocaleString(
          "fr-FR",
          {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        )}
        statut={commande.status == "VALIDATED" ? "validé" : "en attente"}
        date={formatISODate(commande.date).toLocaleString("fr-FR", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        montantBrut={parseFloat(commande.montantBrut).toLocaleString("fr-FR", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        montantHt={parseFloat(commande.montantHt).toLocaleString("fr-FR", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        montantTva={parseFloat(commande.montantTva).toLocaleString("fr-FR", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        montantRemise={parseFloat(commande.montantRemise).toLocaleString(
          "fr-FR",
          {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        )}
      ></LigneCommandes>
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row"
    >
      <div className="flex flex-col  sm:w-[20%] border-r-gray-200 border-r">
        <div
          onClick={() => setSwipeOption("infoPerso")}
          className={
            swipeOption == "infoPerso"
              ? "px-6 bg-red-100 text-base text-rouge py-3.5 border-r-4 border-rouge"
              : "px-6 text-base py-3.5 "
          }
        >
          Informations et coordonnées
        </div>
        <div
          onClick={() => setSwipeOption("password")}
          className={
            swipeOption == "password"
              ? "px-6 bg-red-100 text-base text-rouge py-3.5 border-r-4 border-rouge"
              : "px-6 text-base py-3.5  "
          }
        >
          Changer le mot de passe
        </div>
        <div
          onClick={() => setSwipeOption("adresse")}
          className={
            swipeOption == "adresse"
              ? "px-6 bg-red-100 text-base text-rouge py-3.5 border-r-4 border-rouge"
              : "px-6 text-base py-3.5  "
          }
        >
          Adresse de livraison
        </div>
        <div
          onClick={() => setSwipeOption("commandes")}
          className={
            swipeOption == "commandes"
              ? "px-6 bg-red-100 text-base text-rouge py-3.5 border-r-4 border-rouge"
              : "px-6 text-base py-3.5 "
          }
        >
          Commandes
        </div>
      </div>

      <div className="flex flex-col sm:w-[80%] min-h-[500px] py-5 px-2">
        <div
          className={
            "fixed right-7 flex py-2 justify-center px-2 bg-teal-100 rounded-xl w-fit transition-[display] " +
            ajoutReussi
          }
        >
          <img className="mr-2" loading="lazy" srcSet={imgDangerCircle}></img>
          <div className="text-base">
            Information sauvegarder, rafraichissez{" "}
          </div>
          <button onClick={() => setAjoutReussi("hidden")}>
            <img loading="lazy" srcSet={imgClose}></img>
          </button>
        </div>
        <form
          action={changeInfo}
          id="infoPerso"
          className={swipeOption == "infoPerso" ? "" : "hidden"}
        >
          <h1 className="font-bold text-lg">Informations et coordonnées</h1>

          <div className="pt-3.5 flex justify-between">
            <div className="w-1/2">
              <div className="text-base">nom de l'entreprise</div>
              <input
                value={dataInfoSup.nom}
                onChange={(e) =>
                  setDataInfoSup({ ...dataInfoSup, nom: e.target.value })
                }
                className="w-full border border-gray-300 px-1 py-2"
                placeholder={data["hydra:member"][0].nom}
              ></input>
            </div>

            <div className="w-1/2 ml-8">
              <div className="text-base">numéro de Kbis</div>
              <input
                value={dataInfoSup.prenoms}
                onChange={(e) =>
                  setDataInfoSup({ ...dataInfoSup, prenoms: e.target.value })
                }
                className="w-full border border-gray-300 px-1 py-2"
                placeholder={data["hydra:member"][0].prenoms}
              ></input>
            </div>
          </div>

          <div className="w-full mt-5">
            <div className="text-base">email</div>
            <input
              value={dataInfoSup.email}
              readOnly
              className="w-full border border-gray-300 px-1 py-2"
              type="email"
              placeholder={data["hydra:member"][0].email}
            ></input>
          </div>

          <div className="w-full mt-5">
            <div className="text-base">téléphone1</div>
            <input
              value={dataInfoSup.telephone1}
              onChange={(e) =>
                setDataInfoSup({ ...dataInfoSup, telephone1: e.target.value })
              }
              className="w-full border border-gray-300 px-1 py-2"
              placeholder={data["hydra:member"][0].telephone1}
            ></input>
          </div>

          <div className="w-full mt-5">
            <div className="text-base">téléphone2</div>
            <input
              value={dataInfoSup.telephone2}
              onChange={(e) =>
                setDataInfoSup({ ...dataInfoSup, telephone2: e.target.value })
              }
              className="w-full border border-gray-300 px-1 py-2"
              placeholder={data["hydra:member"][0].telephone2}
            ></input>
          </div>

          <button
            onClick={() => setEtatSauvegarde("SAUVEGARDE EN COURS...")}
            type="submit"
            className="mt-6 text-white w-full bg-rouge text-center py-2.5 rounded-md"
          >
            {etatSauvegarde}
          </button>
        </form>

        <div
          className={
            "fixed z-40 right-7 flex py-2 justify-center px-2 bg-teal-100 rounded-xl w-fit transition-[display] " +
            ajoutPassword
          }
        >
          <img className="mr-2" loading="lazy" srcSet={imgDangerCircle}></img>
          <div className="text-base">
            Mot de passe sauvegarder, rafraichissez{" "}
          </div>
          <button onClick={() => setAjoutPassword("hidden")}>
            <img loading="lazy" srcSet={imgClose}></img>
          </button>
        </div>

        <form
          action={changePassword}
          id="password"
          className={swipeOption == "password" ? "" : "hidden"}
        >
          <h1 className="font-bold text-lg">Changer le mot de passe</h1>

          <div className="w-full mt-3.5">
            <div className="text-base">Mot de passe actuel</div>
            <input
              value={dataPassword.currentPassword}
              onChange={(e) =>
                setDataPassword({
                  ...dataPassword,
                  currentPassword: e.target.value,
                })
              }
              className="w-full border border-gray-300 px-1 py-2"
              type="password"
              placeholder=""
            ></input>
          </div>

          <div className="w-full mt-5">
            <div className="text-base">Nouveau mot de passe </div>
            <input
              value={dataPassword.newPassword}
              onChange={(e) =>
                setDataPassword({
                  ...dataPassword,
                  newPassword: e.target.value,
                })
              }
              className="w-full border border-gray-300 px-1 py-2"
              type="password"
              placeholder=""
            ></input>
          </div>

          <div className="w-full mt-5">
            <div className="text-base">
              Confirmation du nouveau mot de passe
            </div>
            <input
              className="w-full border border-gray-300 px-1 py-2"
              placeholder=""
            ></input>
          </div>

          <button
            onClick={() => setEtatSauvegarde("SAUVEGARDE EN COURS...")}
            type="submit"
            className="mt-6 text-white w-full bg-rouge text-center py-2.5 rounded-md"
          >
            {etatSauvegarde}
          </button>
        </form>

        <div id="adresse" className={swipeOption == "adresse" ? "" : "hidden"}>
          <h1 className="font-bold text-lg">Adresse </h1>

          <Adresse Adress={data["hydra:member"][0].adresses}></Adresse>

          <AddAdress></AddAdress>
        </div>

        <div
          id="commande"
          className={swipeOption == "commandes" ? "" : "hidden"}
        >
          <div className="overflow-x-auto">
            <table className="w-full bg-gray-200  border-collapse">
              <thead>
                <tr className="px-2 py-2 mb-4">
                  <th className="w-[100px] px-2 sm:w-[16%] text-base text-center border border-gray-300">
                    N° de commande
                  </th>
                  <th className="w-[100px] px-2 sm:w-[16%] text-base text-center border border-gray-300">
                    Adresse de livraison
                  </th>
                  <th className="w-[100px] px-2 sm:w-[16%] text-base text-center border border-gray-300">
                    Date
                  </th>
                  <th className="w-[100px] px-2 sm:w-[16%] text-base text-center border border-gray-300">
                    Total
                  </th>
                  <th className="w-[100px] px-2 sm:w-[16%] text-base text-center border border-gray-300">
                    Statut
                  </th>
                  <th className="w-[100px] px-2 sm:w-[16%] text-base text-center border border-gray-300">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>{listLigneCommande}</tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
