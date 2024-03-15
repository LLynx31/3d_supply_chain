'use client'

import {SousCategories} from "@/app/ui/categorie";
import Article from "@/app/ui/article";

import { useState, useRef, useEffect } from "react";

export default function PageCategorie({params}){

  const [categorieInView, setCategorieInView] = useState('best seller')
  
  const refBestSeller = useRef(null)
  const refArrivage = useRef(null)

  const [dataCategorie, setDataCategorie] = useState(null)

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




  return (
    <>

      <div className="text-xl flex flex-col justify-center items-center bg-amber-200 h-[200px] border-b border-b-gray-300">
        <div className="text-[13px] tracking-[.25em] ">Catégorie</div>
        <div className="font-bold">Viande de porc</div>
      </div>


      <div className="px-8 pt-5">
      {/* Categorie */}
      <SousCategories code={params.code} ></SousCategories>

      <div className="pt-1 gap-9 mt-8 flex">

        {/* barre de navigation */}
        <div className="sticky top-5 h-fit items-stretch content-end flex-wrap flex max-w-[202px] flex-col ">
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
              <div  className="grid grid-cols-4 gap-5 mt-5"> 
                <Article></Article>
                <Article></Article>
                <Article></Article>
                <Article></Article>
                <Article></Article>
                <Article></Article>
                <Article></Article>
                <Article></Article>
                <Article></Article>
                <Article></Article>
                <Article></Article>
                <Article></Article>
              </div>
            </div>
        
          {/* nouveau arrivage*/}
          <div  className="mb-16">
              <h1 ref={refArrivage} className="text-xl font-bold ">Nouveaux arrivages</h1>
              <p className="text-base ">Les produits qui viennent d'arriver en stock</p>
              <div  className="grid grid-cols-4 gap-5 mt-5"> 
                <Article></Article>
                <Article></Article>
                <Article></Article>
                <Article></Article>
                <Article></Article>
                <Article></Article>
                <Article></Article>
                <Article></Article>
                <Article></Article>
                <Article></Article>
                <Article></Article>
                <Article></Article>
              </div>
            </div>


            
          
        </div>

      </div>
    </div>
    </>
    
  )
}