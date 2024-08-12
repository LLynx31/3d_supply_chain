'use client'

import {Categories, SousCategories} from "@/app/ui/categorie";
import Article from "@/app/ui/article";

import { useState, useRef, useEffect } from "react";
import LoadingSpinner from "@/app/ui/loading";

import { motion } from "framer-motion"
export default function PageCategorie({params}){

  const [categorieInView, setCategorieInView] = useState('best seller')
  

  const [nameCetgorie, setNameCetgorie] = useState('best seller')

  const refBestSeller = useRef(null)
  const refArrivage = useRef(null)
  

  useEffect(()=>{

    const observerBestSeller = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // L'élément est en vue
          setCategorieInView('best seller')
        }
      });
    });
  
    const observerArrival = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // L'élément est en vue
          setCategorieInView('arrivage')
        } 
      });
    });
  
    observerBestSeller.observe(refBestSeller.current)
    observerArrival.observe(refArrivage.current)


  })


  const [dataSousCategorie, setDataSousCategorie] = useState(null)
  const [dataProductSousCategorie, setDataProductSousCategorie] = useState(null)

  useEffect(()=>{
      fetch("https://api.3dsupplychains.com/api/categories?page=1&code=" + params.code)
      .then((response)=>response.json())
      .then((responseParse) =>
        {
          
          if(responseParse["hydra:member"][0]) {
            setDataSousCategorie(responseParse["hydra:member"][0].sousCategories)
            setNameCetgorie(responseParse["hydra:member"][0].libelle)
          } 
          
          fetch("https://api.3dsupplychains.com/api/produits?page=1&sousCategorie=" + responseParse["hydra:member"][0].sousCategories[0]["@id"])
          .then((response)=>response.json())
          .then((responseParse) => setDataProductSousCategorie(responseParse["hydra:member"]))
          .catch((error)=> console.error(error))
        })}
       
    , [])

  
  if (dataSousCategorie && dataProductSousCategorie){
    
    const listDataProduct = dataProductSousCategorie.map(product => <Article poids={product.description2} code={product.id} key={product["@id"]} nom={product.nom} image={product.imageProduits[0]?.path} price={product.price} newPrice={product.newPrice}></Article>)


  return (
    <motion.div initial={{opacity: 0, y:50}} animate={{opacity:1, y:0}} transition={{duration:0.3}}>

      <div className="text-xl mt-5 sm:mt-1 flex flex-col justify-center items-center bg-amber-200 h-[200px] border-b border-b-gray-300">
        <div className="text-[13px] tracking-[.25em] ">Catégorie</div>
        <div className="font-bold">{nameCetgorie}</div>
      </div>


      <div className="px-3 sm:px-8 pt-5">
        <Categories></Categories>
      {/* Categorie */}
      <SousCategories data={dataSousCategorie} setDataProduct={setDataProductSousCategorie} code={params.code} ></SousCategories>

      <div className="pt-1 gap-9 mt-8 flex">

        {/* barre de navigation */}
        <div className="sticky hidden sm:block top-5 h-fit items-stretch content-end flex-wrap max-w-[202px] flex-col ">
            <div className="text-black text-xl font-bold w-full">
              Navigation
            </div>
            <div className="items-center flex gap-1.5 mt-2.5 px-2">
              <div className={categorieInView == 'best seller' ? 'bg-rouge flex w-[8px] shrink-0 h-[8px]  flex-col my-auto rounded-[50%]' : 'bg-white flex w-[8px] shrink-0 h-[8px]  flex-col my-auto rounded-[50%]'} />
              <div className="text-black text-base font-medium self-stretch">
                Best sellers
              </div>
            </div>
            <div className="items-center flex gap-1.5 mt-2.5 px-2">
              <div  className={categorieInView == 'arrivage' ? 'bg-rouge flex w-[8px] shrink-0 h-[8px]  flex-col my-auto rounded-[50%]' : 'bg-white flex w-[8px] shrink-0 h-[8px]  flex-col my-auto rounded-[50%]'} />
              <div className="text-black text-base font-medium self-stretch">
              Nouveaux arrivages
              </div>
            </div>
            
        </div>


        {/* ventes */}
        <div className="flex flex-col gap-5">

          {/* produit en promotion */}
          <div  className="mb-16">
              <h1 ref={refBestSeller} className="text-xl font-bold ">Les best sellers</h1>
              <p className="text-base ">Les produits les plus vendus de la plateforme</p>
              <div  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 mt-5"> 
                {listDataProduct}
           
              </div>
            </div>
        
          {/* nouveau arrivage*/}
          <div  className="mb-16">
              <h1 ref={refArrivage} className="text-xl font-bold ">Nouveaux arrivages</h1>
              <p className="text-base ">Les produits qui viennent d'arriver en stock</p>
              <div  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 mt-5"> 
              {listDataProduct}
              </div>
            </div>


            
          
        </div>

      </div>
    </div>
    </motion.div>
    
  )
} else {
  return <><div ref={refArrivage}></div> <div ref={refBestSeller}></div><LoadingSpinner></LoadingSpinner></>
}
}