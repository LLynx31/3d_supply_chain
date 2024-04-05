'use client'

import Link from 'next/link';
import { register } from 'swiper/element/bundle';
import { useEffect, useState } from 'react';
import {motion} from "framer-motion"

register()

const imageCategorie = "/categorie.png"

function Categorie({code, image, nom, className}){

    return (
      <motion.div whileHover={{scale:0.9}}>
          <Link href={"/m/categorie/" + code}>
          <div className={"flex-col w-[90px] flex sm:w-fit h-max" + className}>
          <img
            loading="lazy"
            srcSet={image}
            className=" w-full sm:h-full"
          />
          <div className="text-black overflow-hidden text-[11px] whitespace-nowrap bg-amber-300 justify-center py-1">
            {nom}
          </div>
          </div>
        </Link>
      </motion.div>
        
      )
}


function SousCategorie({id, image, nom, className, setDataProduct}){

  async function getProduct(){
    setDataProduct(null)
    fetch("https://api.3dsupplychains.com/api/produits?page=1&sousCategorie=" + id)
          .then((response)=>response.json())
          .then((responseParse) => setDataProduct(responseParse["hydra:member"]))
          .catch((error)=> console.error(error))
  }

  return (
      
        <motion.div whileHover={{scale:0.9}} className={"flex-col flex w-fit cursor-pointer " + className} onClick={()=>getProduct()}>
        <img
          loading="lazy"
          srcSet={image}
          className="w-[100px] sm:w-full sm:h-full"
        />
        <div className="text-black overflow-hidden text-[11px] whitespace-nowrap bg-amber-300 justify-center py-1">
          {nom}
        </div>
        </motion.div>
    )
}

export  function Categories(){

  const [data, setData] = useState([])

    useEffect(()=>{
      fetch("https://api.3dsupplychains.com/api/categories")
      .then((response)=>response.json())
      .then((responseParse)=>setData(responseParse["hydra:member"]))
    }, [])


    let listCategorie
    if(data.length > 0){
      listCategorie = data.map(categorie =>
        <swiper-slide key={categorie.code}>
          <Categorie code={categorie.code} image={imageCategorie} nom={categorie.libelle}></Categorie>
        </swiper-slide>
      )

    }


    return(
        <><div className='my-5 py-5 md:block hidden'>
        <swiper-container space-between="10" slides-per-view={"9"} navigation="true" speed="500" css-mode="true">
          {listCategorie}
          
        </swiper-container>
      </div>
      <div className='my-5 md:hidden'>
          <div className='grid grid-cols-4 gap-2'>
            {listCategorie}
          </div>
        </div></>
        
    )
}


export function SousCategories({code,data,setDataProduct}){
      const listCategorie = data.map(categorie =>
        <swiper-slide key={categorie.code}>
          <SousCategorie id={categorie["@id"]} setDataProduct={setDataProduct} image={imageCategorie} nom={categorie.libelle}></SousCategorie>
        </swiper-slide>
      )

    return(
        <><div className='my-5 md:block hidden'>
        <swiper-container space-between="10" slides-per-view={"9"} navigation="true" speed="500" css-mode="true">
          {listCategorie}
          
        </swiper-container>
      </div><div className='my-5 md:hidden'>
        <div className='grid grid-cols-4 gap-2'>
            {listCategorie}
          </div>
        </div></>
        
    )
}

