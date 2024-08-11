"use client";
import ItemPanier from "../../ui/itemPanier";
import { getPanier } from "@/app/features/getData";
import LoadingSpinner from "@/app/ui/loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

export default function Panier() {
  const [dataPanier, setDataPanier] = useState(null);

  const router = useRouter();

  useEffect(() => {
    async function recupererPanier() {
      try {
        const panier = await getPanier();
        //console.log(panier["hydra:member"]);

        setDataPanier(panier["hydra:member"]);
      } catch (error) {
        console.error(error);
      }
    }

    recupererPanier();
  }, []);

  if (dataPanier) {
    const listPanier = dataPanier[0]?.detailDocuments.map((panier) => (
      <ItemPanier
        id={panier["@id"]}
        key={panier["@id"]}
        prixUnitaire={parseFloat(panier.prixUnitaire).toLocaleString("fr-FR", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        imageProduct={panier.produit.imageProduits[0]?.path}
        nom={panier.produit.nom}
        description={panier.produit.description}
        montantBrut={parseFloat(panier.montantBrut).toLocaleString("fr-FR", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        montantTTC={parseFloat(panier.montantTtc).toLocaleString("fr-FR", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        tva={parseFloat(panier.montantTva).toLocaleString("fr-FR", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        remise={parseFloat(panier.montantRemise).toLocaleString("fr-FR", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        montantHt={parseFloat(panier.montantHt).toLocaleString("fr-FR", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        quantiteProduct={panier.quantite}
      ></ItemPanier>
    ));

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-8 px-3 sm:px-8 pt-5"
      >
        <h1 className="text-center text-xl font-bold">Mon panier</h1>
        <hr></hr>
        <div className="mt-3 flex items-center flex-col xlg:flex-row">
          <div className="w-full min-h-[250px] overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-base  text-center px-3 py-2 border-b border-gray-300">
                    NOM DU PRODUIT
                  </th>
                  <th className="text-base text-center px-3 py-2 border-b border-gray-300">
                    PRIX UNITAIRE (en euro)
                  </th>
                  <th className="text-base text-center px-3 py-2 border-b border-gray-300">
                    MONTANT BRUT 
                  </th>
                  <th className="text-base text-center px-3 py-2 border-b border-gray-300">
                    REMISE
                  </th>
                  <th className="text-base text-center px-3 py-2 border-b border-gray-300">
                    MONTANT HORS TAXE
                  </th>
                  <th className="text-base text-center px-3 py-2 border-b border-gray-300">
                    TVA
                  </th>
                  <th className="text-base text-center px-3 py-2 border-b border-gray-300">
                    QUANTITE
                  </th>
                  <th className="text-base text-center px-3 py-2 border-b border-gray-300">
                    MONTANT TTC
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Les lignes de données seront ajoutées ici */}
               {listPanier}
              </tbody>
            </table>
          </div>

          <button
            disabled={dataPanier[0]?.detailDocuments <= 0 ? true : false}
            onClick={() => router.push("/m/checkout")}
            className="text-white text-base w-fit px-5  bg-rouge text-center py-3 rounded-md"
          >
            VERIFICATION DE LA COMMANDE
          </button>
        </div>
      </motion.div>
    );
  } else {
    return <LoadingSpinner></LoadingSpinner>;
  }
}
