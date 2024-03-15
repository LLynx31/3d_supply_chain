'use client'

import Link from 'next/link';
import { register } from 'swiper/element/bundle';
import { useEffect, useState } from 'react';

register()

const imageCategorie = "/categorie.png"

function Categorie({code, image, nom, className}){

    return (
        <Link href={"/m/categorie/" + code}>
          <div className={"flex-col flex w-fit " + className}>
          <img
            loading="lazy"
            srcSet={image}
            className="h-full w-full object-cover object-center inset-0"
          />
          <div className="text-black text-base whitespace-nowrap bg-amber-300 justify-center items-stretchpx-7 py-2">
            {nom}
          </div>
          </div>
        </Link>
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
        <><div className='my-5 md:block hidden'>
        <swiper-container space-between="10" slides-per-view={"9"} navigation="true" speed="500" css-mode="true">
          {listCategorie}
          
        </swiper-container>
      </div><div className='my-5 md:hidden'>
          <swiper-container space-between="10" slides-per-view="5" navigation="true" speed="500"  css-mode="true">
            {listCategorie}
          </swiper-container>
        </div></>
        
    )
}


export function SousCategories({code}){

  const [data, setData] = useState(null)

    useEffect(()=>{
      fetch("https://api.3dsupplychains.com/api/categories?page=1&code=" + code)
      .then((response)=>response.json())
      .then((responseParse)=>setData(responseParse["hydra:member"][0].sousCategories))
    }, [])


    
    if(data){
      const listCategorie = data.map(categorie =>
        <swiper-slide key={categorie.code}>
          <Categorie code={code + "/"+ "#" + categorie.code} image={imageCategorie} nom={categorie.libelle}></Categorie>
        </swiper-slide>
      )

    


    return(
        <><div className='my-5 md:block hidden'>
        <swiper-container space-between="10" slides-per-view={"9"} navigation="true" speed="500" css-mode="true">
          {listCategorie}
          
        </swiper-container>
      </div><div className='my-5 md:hidden'>
          <swiper-container space-between="10" slides-per-view="5" navigation="true" speed="500"  css-mode="true">
            {listCategorie}
          </swiper-container>
        </div></>
        
    )
}else{
  return <div></div>
}

}