"use client";
import { useState } from "react";
import { postInscription } from "../features/inscription";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

function FormInscription({ setLose, isLose }) {
  const [data, setData] = useState({
    nom: "",
    prenoms: "",
    telephone1: "",
    telephone2: "",
    email: "",
    typeUser: "/api/type_users/1",
    plainPassword: "",
  });

  const router = useRouter();

  const [isTextButton, setTextButton] = useState("VALIDER");

  function updateNom(dataUpate) {
    setData({
      ...data,
      nom: dataUpate,
    });
  }

  function updatePrénom(dataUpate) {
    setData({
      ...data,
      prenoms: dataUpate,
    });
  }

  function updateTelephone1(dataUpate) {
    setData({
      ...data,
      telephone1: dataUpate,
    });
  }

  function updateTelephone2(dataUpate) {
    setData({
      ...data,
      telephone2: dataUpate,
    });
  }

  function updateEmail(dataUpate) {
    setData({
      ...data,
      email: dataUpate,
    });
  }

  function updatePlainPassword(dataUpate) {
    setData({
      ...data,
      plainPassword: dataUpate,
    });
  }

  async function actionForm() {
    
    const response = await postInscription(data);

    //console.log(response);
    if (response === true) {
      if (isLose) setLose(false);
      setTextButton("VALIDER");
      return router.replace("/confirmeMail");
    }

    setLose(true);
    setTextButton("VALIDER");
  }

  return (
    <>
      <h1 className="text-xl font-bold text-center">Création de compte</h1>
      <p className="text-base text-center ">
        Vous avez déjà un compte ?{" "}
        <Link href={"/connexion"} className="text-base text-jaune underline">
          clickez ici pour vous connecter
        </Link>{" "}
      </p>

      <form action={actionForm}>
        <div className="w-full mt-5">
          <div className="text-base">Nom de l'entreprise</div>
          <input
            name="nom"
            value={data.nom}
            onChange={(e) => updateNom(e.target.value)}
            className="w-full border border-gray-300 px-2 py-2"
            type="text"
            placeholder="Nom de l'entreprise"
          ></input>
        </div>

        <div className="w-full mt-5">
          <div className="text-base">Numéro de Kbis </div>
          <input
            name="Numéro de Kbis"
            value={data.prenoms}
            onChange={(e) => updatePrénom(e.target.value)}
            className="w-full border border-gray-300 px-2 py-2"
            type="text"
            placeholder="Numéro de Kbis"
          ></input>
        </div>

        <div className="w-full mt-5">
          <div className="text-base">Email </div>
          <input
            name="email"
            value={data.email}
            onChange={(e) => updateEmail(e.target.value)}
            className="w-full border border-gray-300 px-2 py-2"
            type="email"
            placeholder="email"
          ></input>
        </div>

        <div className="w-full mt-5">
          <div className="text-base">Mot de passe </div>
          <input
            name="plainPassword"
            value={data.plainPassword}
            onChange={(e) => updatePlainPassword(e.target.value)}
            className="w-full border border-gray-300 px-2 py-2"
            type="password"
            placeholder="mot de passe"
          ></input>
        </div>

        <div className="w-full mt-5">
          <div className="text-base">Confirmation mot de passe </div>
          <input
            name="plainPassword"
            className="w-full border border-gray-300 px-2 py-2"
            type="password"
            placeholder="confirmer le mot de passe"
          ></input>
        </div>

        <div className="w-full mt-5">
          <div className="text-base">téléphone 1 </div>
          <input
            name="telephone1"
            value={data.telephone1}
            onChange={(e) => updateTelephone1(e.target.value)}
            className="w-full border border-gray-300 px-2 py-2"
            type="text"
            placeholder="ex: 0908070403"
          ></input>
        </div>

        <div className="w-full mt-5">
          <div className="text-base">téléphone 2 </div>
          <input
            name="telephone2"
            value={data.telephone2}
            onChange={(e) => updateTelephone2(e.target.value)}
            className="w-full border border-gray-300 px-2 py-2"
            type="text"
            placeholder="ex: 0908070403"
          ></input>
        </div>

        <button onClick={()=>setTextButton("CONNEXION...")} className="mt-6 text-white w-full bg-rouge text-center py-2.5 rounded-md">
          {isTextButton}
        </button>
      </form>
    </>
  );
}

function SuccesInscription() {
  const imgDangerCircle = "/Danger_Circle.png";
  return (
    <div className="flex flex-col py-20">
      <h1 className="text-xl font-bold text-center">Création de compte</h1>
      <p className="text-base text-center mb-3">Confirmation du compte</p>
      <div
        className={
          "flex py-2 justify-center items-center px-2 bg-teal-50 rounded-xl w-fit transition-[display] "
        }
      >
        <img className="mr-2" loading="lazy" srcSet={imgDangerCircle}></img>
        <div className="text-teal-500">
          Un code a été envoyé à l'adresse mail utilié, utilisé le pour valider
          l'inscription.{" "}
        </div>
      </div>

      {/*<button className="mt-6 text-white w-full bg-rouge text-center py-2.5 rounded-md font-bold tracking-wider">Renvoyer</button>*/}

      <button
        onClick={() => {
          document.location.href = "/confirmeMail";
        }}
        className="mt-6 text-base w-full bg-jaune text-center py-2.5 rounded-md mb-2 font-bold tracking-wider"
      >
        Valider l'inscription
      </button>
    </div>
  );
}

export default function InscriptionPage() {
  const bannerImg = "/barniere_site_3D_supply_chain_VERTICALE.jpg";

  const [succes, setSucces] = useState(false);
  const [lose, setLose] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex gap-20 mt-8 mb-20"
    >
      <img loading="lazy" srcSet={bannerImg} className="hidden sm:block"></img>

      <div className="w-[1/2]">
        {!succes ? (
          <FormInscription
            isLose={lose}
            setLose={setLose}
            setSucces={setSucces}
          ></FormInscription>
        ) : (
          <SuccesInscription></SuccesInscription>
        )}
        {lose && (
          <div className="text-base my-3 text-center text-rouge">
            Ce mail est déjà associé à un compte.
          </div>
        )}
      </div>
    </motion.div>
  );
}
