"use client";
import { useState } from "react";
import { postAdress } from "../features/postData";
import { pacthAdress } from "../features/pacthData";
import { useRouter } from "next/navigation";

function AdresseItem({ adresse, nbr }) {
  const router = useRouter();

  const [changeView, setChangeView] = useState(false);
  const [changeText, setChangeText] = useState("Changer");

  const [showAlert, setShowAlert] = useState(false);

  const [etatSauvegarde, setEtatSauvegarde] = useState("SAUVEGARDER");

  const imgDangerCircle = "/Danger_Circle.png";
  const imgClose = "/x.png";

  const [dataAdress, setDataAdress] = useState({
    ville: adresse.ville,
    commune: adresse.commune,
    infoSup: "",
    pays: adresse.pays,
  });

  async function changeAdresse() {
    try {
      const response = await pacthAdress(dataAdress, adresse["@id"]);
      setShowAlert(true);
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setEtatSauvegarde("SAUVEGARDER");
    }
  }

  return (
    <div>
      <div className="flex text-base justify-between my-2 bg-emerald-50 px-2 rounded-md py-2 w-full">
        <div className="text-gray-500">{nbr}</div>

        {adresse.pays + ", " + adresse.ville + ", " + adresse.commune}

        <button
          onClick={() => {
            setChangeView(!changeView),
              changeText == "Changer"
                ? setChangeText("Fermer")
                : setChangeText("Changer");
          }}
          className=" text-rouge"
        >
          {changeText}
        </button>
      </div>

      <form className={!changeView ? "hidden" : ""} action={changeAdresse}>
        <h2 className="font-bold text-lg mt-5">Modifier l'adresse</h2>
        <div className="w-full mt-3.5">
          <div className="text-base">Code postal</div>
          <input
            className="w-full border border-gray-300 px-1 py-2"
            value={dataAdress.pays}
            onChange={(e) =>
              setDataAdress({ ...dataAdress, pays: e.target.value })
            }
            type="text"
            placeholder="Cote d'Ivoire"
          ></input>
        </div>
        <div className="w-full mt-3.5">
          <div className="text-base">Ville</div>
          <input
            className="w-full border border-gray-300 px-1 py-2"
            value={dataAdress.ville}
            onChange={(e) =>
              setDataAdress({ ...dataAdress, ville: e.target.value })
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
              setDataAdress({ ...dataAdress, commune: e.target.value })
            }
            type="text"
          ></input>
        </div>

        <div className="w-full mt-5">
          <div className="text-base">Information additionnel</div>
          <input
            className="w-full border border-gray-300 px-1 py-2"
            value={dataAdress.infoSup}
            onChange={(e) =>
              setDataAdress({ ...dataAdress, infoSup: e.target.value })
            }
            type="text"
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
    </div>
  );
}

export function Adresse({ Adress }) {
  const [changeView, setChangeView] = useState(false);
  const [changeText, setChangeText] = useState("Changer");

  let i = 0;
  const listAdress = Adress.map((e) => {
    i = i + 1;
    return <AdresseItem key={i} nbr={i} adresse={e}></AdresseItem>;
  });
  return <div>{listAdress}</div>;
}

export function AddAdress() {
  const [etatSauvegarde, setEtatSauvegarde] = useState("AJOUTER");

  const [formAddAddressView, setFormAddAddressView] = useState(false);

  const router = useRouter();

  const [dataAdress, setDataAdress] = useState({
    ville: "",
    commune: "",
    infoSup: "",
    pays: "",
  });


  async function actionForm(dataForm) {
    try {
      //console.log(dataForm)
      const response = await postAdress(dataForm);
      setDataAdress({ ville: "", commune: "", infoSup: "", pays: "" });
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setEtatSauvegarde("AJOUT");
    }
  }

  return (
    <>
      <button
        onClick={() => setFormAddAddressView(true)}
        className={
          formAddAddressView
            ? "hidden"
            : "mt-6 text-white w-full bg-rouge text-center py-2.5 rounded-md"
        }
      >
        AJOUTER UNE NOUVELLE ADRESSE
      </button>

      <form
        className={!formAddAddressView ? "hidden" : ""}
        action={() => actionForm(dataAdress)}
      >
        <h2 className="font-bold text-lg mt-5">Ajouter une adresse</h2>
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
              setDataAdress({ ...dataAdress, ville: e.target.value })
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
              setDataAdress({ ...dataAdress, commune: e.target.value })
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
              setDataAdress({ ...dataAdress, infoSup: e.target.value })
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
    </>
  );
}
