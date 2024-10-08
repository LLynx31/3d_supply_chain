"use client";
import LoadingSpinner from "@/app/ui/loading";
import Article from "../../../ui/article";

import { useState, useEffect, useContext } from "react";
import { postAddPanier } from "@/app/features/postData";
import { usePathname, useRouter } from "next/navigation";

import { motion } from "framer-motion";
import { Categories } from "@/app/ui/categorie";
import { Alert } from "@mui/material";
import { PageContext } from "@/app/contextProvider";

export default function ArticleView({ params }) {
  const router = useRouter();

  const pathName = usePathname();
  const thisPage = useContext(PageContext);
  useEffect(() => {
    thisPage.setPage(pathName);
  });

  const imgShoppingCart = "/shopping-cart.png";
  //const imgDangerCircle = "/Danger_Circle.png";
  //const imgClose = "/x.png"

  const [quantite, setQuantite] = useState(1);
  const [swipeDescription, setSwipDescritption] = useState("description");
  const [swipeImageProduct, setImageProduct] = useState(false);
  const [dataProduct, setDataProduct] = useState(null);
  const [dataProductSimilar, setDataProductSimilar] = useState(false);
  const [etatAjout, setEtatAJout] = useState("ajouter au panier");
  const [showAlertSucces, setShowAlertSucces] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);

  //useEffect(() => console.log(swipeImageProduct), [swipeImageProduct]);

  useEffect(() => {
    const link = "https://api.3dsupplychains.com/api/produits/" + params.code;
    fetch(link)
      .then((response) => response.json())
      .then((responseParse) => {
        setDataProduct(responseParse);
        if (responseParse.imageProduits["hydra:member"][0]?.path) {
          setImageProduct(
            "https://api.3dsupplychains.com/" +
              responseParse.imageProduits["hydra:member"][0]?.path
          );
        }

        fetch(
          "https://api.3dsupplychains.com/api/produits?page=1&sousCategorie=" +
            responseParse.sousCategorie["@id"]
        )
          .then((response) => response.json())
          .then((responseParse) =>
            setDataProductSimilar(responseParse["hydra:member"])
          );
      });
  }, []);

  if (dataProduct) {
    async function ajoutePanier() {
      try {
        //console.log(dataProduct.id)
        const etat = await postAddPanier(dataProduct.id, quantite);
        //console.log(pathName)
        //console.log(etat)
        if (etat == "Ok") {
          router.refresh();
          setShowAlertSucces(true);

          // Masquer l'alerte après 3 secondes
          setTimeout(() => {
            setShowAlertSucces(false);
          }, 3000);
        } else {
          console.log(etat);
          setShowAlertError(etat.message);

          // Masquer l'alerte après 3 secondes
          setTimeout(() => {
            setShowAlertError(false);
          }, 3000);
        }

        setEtatAJout("ajouter au panier");
      } catch (error) {
        router.push("/connexion");
      }
    }

    //console.log(dataProduct)

    const listImageDataProduct = dataProduct.imageProduits["hydra:member"].map(
      (image) => {
        const linkImage = "https://api.3dsupplychains.com/" + image.path;
        return (
          <img
            loading="lazy"
            key={image.path}
            onClick={() => setImageProduct(linkImage)}
            srcSet={linkImage}
            alt="boeuf"
            className="rounded-md w-[80px] cursor-pointer h-[80px] my-3"
          ></img>
        );
      }
    );

    let listDataProductSimilar = null;

    if (dataProductSimilar) {
      listDataProductSimilar = dataProductSimilar.map((product) => (
        <Article
          poids={product.description2}
          code={product.id}
          key={product.id}
          nom={product.nom}
          image={product.imageProduits[0]?.path}
          price={product.price}
          newPrice={product.newPrice}
        ></Article>
      ));
    }

    //console.log(swipeDescription)

    function augmenteQuantite() {
      setQuantite(quantite + 1);
    }

    function diminuQuantite() {
      quantite > 1 && setQuantite(quantite - 1);
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative px-5 pt-5"
      >
        {showAlertSucces && (
          <div className="fixed flex justify-center w-full left-0 top-2">
            <Alert className="w-fit" variant="filled" severity="success">
              {dataProduct.nom} ajouté avec succès
            </Alert>
          </div>
        )}

        {showAlertError && (
          <div className="fixed flex justify-center w-full left-0 top-2">
            <Alert className="w-fit" variant="filled" severity="error">
              {showAlertError}
            </Alert>
          </div>
        )}

        <Categories></Categories>
        <div className="text-base  font-semibold mb-5">
          Acceuil &gt;{" "}
          <span className="text-[#9ca3af] font-medium">{dataProduct.nom}</span>{" "}
        </div>

        {/* article, ses images et sa description */}
        <div className="flex sm:flex-row gap-5 flex-col mb-12">
          {/* image en mignature */}
          <div className="flex sm:flex-col gap-1 flex-wrap w-full sm:w-[100px]">
            {listImageDataProduct.length > 0 ? (
              listImageDataProduct
            ) : (
              <div className="bg-slate-300 w-[80px] h-[80px]  "></div>
            )}
          </div>
          {/* fin image en mignature */}

          {/* image en grandeur nature */}
          {swipeImageProduct ? (
            <img
              loading="lazy"
              srcSet={swipeImageProduct}
              alt={dataProduct.nom}
              className="md:w-[310px] lg:w-[450px]"
            ></img>
          ) : (
            <div className="bg-slate-300 w-full h-[200px] md:w-[310px] lg:w-[450px] md:h-[310px]  "></div>
          )}

          {/* description */}
          <div className=" w-fit">
            <h1 className="text-lg sm:text-xl font-bold ">{dataProduct.nom}</h1>
            <div className="text-base  text-[#9ca3af]">
              {dataProduct.description}
            </div>

            {dataProduct.quantiteStock > 1 ? (
              <div className="px-3 py-2 my-3 rounded-md bg-teal-50 border border-teal-300 text-base ">
                Disponibilité : <span className="text-teal-400">En stock</span>
              </div>
            ) : (
              <div className="px-3 py-2 my-3 rounded-md bg-red-50 border border-red-300 text-base ">
                Disponibilité :{" "}
                <span className="text-red-400">Indisponible</span>
              </div>
            )}

            <div className="text-lg ">
              {parseInt(dataProduct.newPrice)} EURO
            </div>

            <p className="mt-3 text-base mb-8">{dataProduct.description}</p>

            <div className="flex w-[150px] justify-between bg-slate-100 px-5 rounded-3xl py-2 mt-3">
              <button onClick={diminuQuantite}>-</button>
              {quantite}
              <button onClick={augmenteQuantite}>+</button>
            </div>

            <button
              disabled={dataProduct.quantiteStock > 1 ? false : true}
              onClick={() => {
                setEtatAJout("ajout en cours..."), ajoutePanier();
              }}
              className="flex justify-center items-center  text-base text-white w-full bg-rouge rounded-xl px-3 py-3 mt-5"
            >
              <img
                loading="lazy"
                alt="shopping cart"
                src={imgShoppingCart}
                className="h-[20px] w-[20px]"
              ></img>
              <div className="ml-5 text-base">{etatAjout}</div>
            </button>
          </div>
        </div>
        {/* article, ses images et sa description */}

        {/* description du bas*/}

        <div className="mt-5 h-[250px]">
          <div className="border-b text-base border-b-gray-300 flex">
            <div
              onClick={() => setSwipDescritption("description")}
              className={
                swipeDescription == "description"
                  ? "cursor-pointer px-2 py-2 border-b-2 border-b-rouge"
                  : "cursor-pointer px-2 py-2 border-b-2 border-b-white"
              }
            >
              Description
            </div>

            <div
              onClick={() => {
                setSwipDescritption("infoSupp");
              }}
              className={
                swipeDescription == "infoSupp"
                  ? "cursor-pointer px-2 py-2 border-b-2 border-b-rouge"
                  : "cursor-pointer px-2 py-2 border-b-2 border-b-white"
              }
            >
              Informations supplémentaires
            </div>

            <div
              onClick={() => setSwipDescritption("conservation")}
              className={
                swipeDescription == "conservation"
                  ? "cursor-pointer px-2 py-2 border-b-2 border-b-rouge"
                  : "cursor-pointer px-2 py-2 border-b-2 border-b-white"
              }
            >
              Conservation
            </div>
          </div>

          <div
            className={
              swipeDescription == "description" ? "mt-5 text-base" : "hidden"
            }
          >
            {dataProduct.description}
          </div>

          <div
            className={
              swipeDescription == "infoSupp" ? "mt-5 text-base" : "hidden"
            }
          >
            {dataProduct.description}
          </div>

          <div
            className={
              swipeDescription == "conservation" ? "mt-5 text-base" : "hidden"
            }
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque a,
            reprehenderit, eligendi illum, quasi fugit veritatis aut obcaecati
            eos atque officiis omnis excepturi quod quam. Voluptatem quia nam
            nihil voluptates!
          </div>
        </div>
        {/* fin description du bas */}

        {/* produit similaire */}
        <div className="mt-16 mb-28">
          <h1 className="text-2xl font-bold  mb-5">Produit similaire</h1>
          <div className="grid gap-2 grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 sm:gap-4">
            {listDataProductSimilar}
          </div>
        </div>
        {/* fin produit similaire */}
      </motion.div>
    );
  } else {
    return <LoadingSpinner></LoadingSpinner>;
  }
}
