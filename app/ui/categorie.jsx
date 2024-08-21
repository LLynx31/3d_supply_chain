"use client";

import Link from "next/link";
import { register } from "swiper/element/bundle";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

register();

function Categorie({ code, image, nom, className }) {
  return (
    <motion.div whileHover={{ scale: 0.9 }}>
      <Link href={"/m/categorie/" + code}>
        <div className={"flex-col flex sm:w-fit h-max" + className}>
          <img
            loading="lazy"
            srcSet={
              image
                ? "https://api.3dsupplychains.com/" + image
                : "/image_categorie.jpg"
            }
            className=""
          />
          <div className="text-black overflow-hidden text-wrap text-center  text-[11px] whitespace-nowrap bg-amber-300 justify-center py-1">
            {nom}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function SousCategorie({ id, image, nom, className, setDataProduct }) {
  async function getProduct() {
    setDataProduct(null);
    fetch(
      "https://api.3dsupplychains.com/api/produits?page=1&sousCategorie=" + id
    )
      .then((response) => response.json())
      .then((responseParse) => setDataProduct(responseParse["hydra:member"]))
      .catch((error) => console.error(error));
  }

  return (
    <motion.div
      whileHover={{ scale: 0.9 }}
      className={"flex-col flex w-fit cursor-pointer " + className}
      onClick={() => getProduct()}
    >
      <img
        loading="lazy"
        srcSet={
          image
            ? "https://api.3dsupplychains.com/" + image
            : "/image_categorie.jpg"
        }
        className="w-[120px] sm:w-full"
      />
      <div className="text-black overflow-hidden text-[11px] whitespace-nowrap bg-amber-300 justify-center py-1">
        {nom}
      </div>
    </motion.div>
  );
}

export function Categories() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://api.3dsupplychains.com/api/categories")
      .then((response) => response.json())
      .then((responseParse) => setData(responseParse["hydra:member"]));
  }, []);

  let listCategorie;
  if (data.length > 0) {
    listCategorie = data.map((categorie) => (
      <Categorie
        key={categorie.code}
        code={categorie.code}
        image={categorie.coverImagePath}
        nom={categorie.libelle}
      ></Categorie>
    ));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="text-base">Categories {}</div>
      <hr className="my-2"></hr>
      {/*<div className="my-5 py-5 md:block hidden">
        {<swiper-container space-between="10" slides-per-view={"2"} navigation="true" speed="500" css-mode="true">
          {listCategorie}
    </swiper-container>}
        <div className="grid grid-cols-4 gap-3">{listCategorie}</div>
      </div>*/}
      <div className="my-5 ">
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-3">
          {listCategorie}
        </div>
      </div>
    </motion.div>
  );
}

export function SousCategories({data, setDataProduct, categorie }) {
  //console.log(data);
  const listCategorie = data.map((categorie) => (
    <SousCategorie
      key={categorie.code}
      id={categorie["@id"]}
      setDataProduct={setDataProduct}
      image={categorie.coverImagePath}
      nom={categorie.libelle}
    ></SousCategorie>
  ));

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="text-base">Sous Categories de "{categorie}"</div>
      <hr className="my-2"></hr>
      {/*<div className="my-5 py-5 md:block hidden">
        {<swiper-container space-between="10" slides-per-view={"2"} navigation="true" speed="500" css-mode="true">
          {listCategorie}
    </swiper-container>}
        <div className="grid grid-cols-4 gap-3">{listCategorie}</div>
      </div>*/}
      <div className="my-5 ">
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-3">
          {listCategorie}
        </div>
      </div>
    </motion.div>
  );
}
