"use client";

import { PageContext } from "@/app/contextProvider";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";

export default function PageFAQ() {
  const [isq1View, setIsq1View] = useState("hidden");
  const [isq2View, setIsq2View] = useState("hidden");
  const [isq3View, setIsq3View] = useState("hidden");
  const [isq4View, setIsq4View] = useState("hidden");
  const [isq5View, setIsq5View] = useState("hidden");
  const [isq6View, setIsq6View] = useState("hidden");

  const thisPage = useContext(PageContext);
  useEffect(() => {
    thisPage.setPage(false);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-16 px-24"
    >
      <h1 className="font-bold text-[50px] tracking-[0.10em] text-center">
        FAQ
      </h1>
      <p className="text-center text-base tracking-[0.05em] mb-8">
        Vos questions frequemment posées
      </p>
      <div className="grid sm:grid-cols-2 gap-10">
        <div className="flex flex-col gap-2">
          <div className="px-3 py-3 flex h-[52px] justify-between items-center bg-slate-100">
            <div className="text-base">Comment créer un compte ?</div>
            {isq1View === "hidden" ? (
              <div
                className="text-[18px] cursor-pointer"
                onClick={() => setIsq1View("")}
              >
                +
              </div>
            ) : (
              <div
                className="text-[18px] cursor-pointer"
                onClick={() => setIsq1View("hidden")}
              >
                -
              </div>
            )}
          </div>

          <div className={"text-base px-3 text-red-500 " + isq1View}>
            Cliquez sur l’icône de compte. Si vous n’avez pas de
            compte déjà enregistré cliquez sur créer un compte.
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="px-3 py-3 flex h-[52px] justify-between items-center bg-slate-100">
            <div className="text-base">Comment passer un achat ?</div>
            {isq2View === "hidden" ? (
              <div
                className="text-[18px] cursor-pointer"
                onClick={() => setIsq2View("")}
              >
                +
              </div>
            ) : (
              <div
                className="text-[18px] cursor-pointer"
                onClick={() => setIsq2View("hidden")}
              >
                -
              </div>
            )}
          </div>

          <div className={"text-base px-3 text-red-500 " + isq2View}>
            Sélectionnez votre article, ajoutez au panier, renseignez
            vos informations, ajoutez votre adresse de livraison, générez votre
            lien de paiement puis valider.
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="px-3 py-3 flex h-[52px] justify-between items-center bg-slate-100">
            <div className="text-base">Comment valider son panier ?</div>
            {isq3View === "hidden" ? (
              <div
                className="text-[18px] cursor-pointer"
                onClick={() => setIsq3View("")}
              >
                +
              </div>
            ) : (
              <div
                className="text-[18px] cursor-pointer"
                onClick={() => setIsq3View("hidden")}
              >
                -
              </div>
            )}
          </div>

          <div className={"text-base px-3 text-red-500 " + isq3View}>
            Cliquez sur l’icone panier, renseignez vos informations.
            Cliquez à nouveau sur l’icone panier, cliquez sur vérifier ma
            commande, renseignez votre adresse de livraison, cliquez sur générer
            un lien de paiement, renseignez les informations qui figures sur
            votre carte visa puis cliquez sur payer.
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="px-3 py-3 flex h-[52px] justify-between items-center bg-slate-100">
            <div className="text-base">Comment nous contacter ?</div>
            {isq4View === "hidden" ? (
              <div
                className="text-[18px] cursor-pointer"
                onClick={() => setIsq4View("")}
              >
                +
              </div>
            ) : (
              <div
                className="text-[18px] cursor-pointer"
                onClick={() => setIsq4View("hidden")}
              >
                -
              </div>
            )}
          </div>

          <div className={"text-base px-3 text-red-500 " + isq4View}>
            Cliquez dans l’onglet qui sommes-nous, laissez vos
            informations ou préoccupations puis validez.
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="px-3 py-3 flex h-[52px] justify-between items-center bg-slate-100">
            <div className="text-base">
              Comment retrouvez rapidement vos produits ?
            </div>
            {isq5View === "hidden" ? (
              <div
                className="text-[18px] cursor-pointer"
                onClick={() => setIsq5View("")}
              >
                +
              </div>
            ) : (
              <div
                className="text-[18px] cursor-pointer"
                onClick={() => setIsq5View("hidden")}
              >
                -
              </div>
            )}
          </div>

          <div className={"text-base px-3 text-red-500 " + isq5View}>
            Cliquez dans la barre de recherche, saisissez le nom du
            produit puis validez.
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="px-3 py-3 flex h-[52px] justify-between items-center bg-slate-100">
            <div className="text-base">
              Comment revenir à la page d’accueil ?
            </div>
            {isq6View === "hidden" ? (
              <div
                className="text-[18px] cursor-pointer"
                onClick={() => setIsq6View("")}
              >
                +
              </div>
            ) : (
              <div
                className="text-[18px] cursor-pointer"
                onClick={() => setIsq6View("hidden")}
              >
                -
              </div>
            )}
          </div>

          <div className={"text-base px-3 text-red-500 " + isq6View}>
            Cliquez sur le logo 3D Supply Chain.
          </div>
        </div>
      </div>
    </motion.div>
  );
}
