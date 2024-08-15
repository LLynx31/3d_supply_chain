"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { verifyCodeConfirmeMail } from "../features/postData";
import { motion } from "framer-motion";
import { AuthContext, PageContext } from "../contextProvider";
import { useRouter } from "next/navigation";

export default function ConfirmeMailPage() {
  const authentification = useContext(AuthContext);
  const thisPage = useContext(PageContext);
  const router = useRouter();
  const [isData, setData] = useState({ email: "", code: "" });

  const [isTextButton, setTextButton] = useState("Valider l'inscription");
  const [isErrorCode, setErrorCode] = useState(false);
  const [isValidCode, setValideCode] = useState(false);

  async function verifierCode() {
    setTextButton("Envoie...");

    const response = await verifyCodeConfirmeMail(isData);
    setTextButton("Valider l'inscription");

    if (response === true) {
      authentification.setConnected(true);

      if (thisPage.isPage && thisPage.isPage.includes("/m/article")) {
        return router.push(thisPage.isPage);
      }

      return router.push("/m/compte");
    }
    setErrorCode(true);
  }

  //useEffect(() => console.log(registerSendMail()), []);

  const logo = "/logo.png";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex mt-20 justify-center h-screen "
    >
      <div className="bg-white p-5 w-[300px] sm:w-[500px]   sm:p-8">
        <Link href={"/"}>
          <img
            className="w-[150px] mx-auto"
            loading="lazy"
            alt="3d supply chain"
            src={logo}
          />
        </Link>
        <h1 className="text-lg text-center font-bold">Confirmer votre mail.</h1>
        <p className="text-base text-center font-light">
          Renseignez votre email et le code reçue.
        </p>
        <div className="w-full mt-3.5">
          {isValidCode && (
            <div className="text-base text-center text-green-600">
              Votre inscription a été effectuer avec succès.{" "}
              <Link href={"/"} className="underline ">
                Cliquez ici pour vous connecter avec vos identifiants.
              </Link>
            </div>
          )}
          {isErrorCode && (
            <div className="text-base text-center text-rouge">
              Code incorrect
            </div>
          )}
          <div className="text-base my-2 text-blue-600">
            Un mail contenant un code de confirmation a été envoyé a l'adresse
            indiquée.
          </div>
          <div className="text-base">Entrez votre email.</div>
          <input
            className="w-full border border-gray-300 px-1 py-2 mb-2"
            onChange={(e) => setData({ ...isData, email: e.target.value })}
            type="email"
            placeholder="example@gmail.com"
          ></input>
          <div className="text-base">Entrez le code que vous avez reçu.</div>
          <input
            className="w-full border border-gray-300 px-1 py-2"
            onChange={(e) => setData({ ...isData, code: e.target.value })}
            type="text"
            placeholder="code"
          ></input>
          <button
            onClick={verifierCode}
            className="mt-6 text-base w-full bg-jaune text-center py-2.5 rounded-md mb-2"
          >
            {isTextButton}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
