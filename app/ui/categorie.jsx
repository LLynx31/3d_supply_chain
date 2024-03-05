'use client'

import Link from 'next/link';
import { register } from 'swiper/element/bundle';

register()

function Categorie({image, nom, className}){

    return (
        <Link href="/m/categorie"><div className={"flex-col flex " + className}>
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

export default function Categories(){

  const imageCategorie = "/categorie.png"


    return(
        <><div className='my-5 md:block hidden'>
        <swiper-container space-between="10" slides-per-view="9" navigation="true" speed="500" loop="true" css-mode="true">
          <swiper-slide><Categorie image={imageCategorie} nom={"légumes"}></Categorie></swiper-slide>
          <swiper-slide><Categorie image={imageCategorie} nom={"légumes"}></Categorie></swiper-slide>
          <swiper-slide><Categorie image={imageCategorie} nom={"légumes"}></Categorie></swiper-slide>
          <swiper-slide><Categorie image={imageCategorie} nom={"légumes"}></Categorie></swiper-slide>
          <swiper-slide><Categorie image={imageCategorie} nom={"légumes"}></Categorie></swiper-slide>
          <swiper-slide><Categorie image={imageCategorie} nom={"légumes"}></Categorie></swiper-slide>
          <swiper-slide><Categorie image={imageCategorie} nom={"légumes"}></Categorie></swiper-slide>
          <swiper-slide><Categorie image={imageCategorie} nom={"légumes"}></Categorie></swiper-slide>
          <swiper-slide><Categorie image={imageCategorie} nom={"légumes"}></Categorie></swiper-slide>
          <swiper-slide><Categorie image={imageCategorie} nom={"légumes"}></Categorie></swiper-slide>
          <swiper-slide><Categorie image={imageCategorie} nom={"légumes"}></Categorie></swiper-slide>
          <swiper-slide><Categorie image={imageCategorie} nom={"légumes"}></Categorie></swiper-slide>
        </swiper-container>
      </div><div className='my-5 md:hidden'>
          <swiper-container space-between="10" slides-per-view="5" navigation="true" speed="500" loop="true" css-mode="true">
            <swiper-slide><Categorie image={imageCategorie} nom={"légumes"}></Categorie></swiper-slide>
            <swiper-slide><Categorie image={imageCategorie} nom={"légumes"}></Categorie></swiper-slide>
            <swiper-slide><Categorie image={imageCategorie} nom={"légumes"}></Categorie></swiper-slide>
            <swiper-slide><Categorie image={imageCategorie} nom={"légumes"}></Categorie></swiper-slide>
            <swiper-slide><Categorie image={imageCategorie} nom={"légumes"}></Categorie></swiper-slide>
            <swiper-slide><Categorie image={imageCategorie} nom={"légumes"}></Categorie></swiper-slide>
            <swiper-slide><Categorie image={imageCategorie} nom={"légumes"}></Categorie></swiper-slide>
            <swiper-slide><Categorie image={imageCategorie} nom={"légumes"}></Categorie></swiper-slide>
            <swiper-slide><Categorie image={imageCategorie} nom={"légumes"}></Categorie></swiper-slide>
            <swiper-slide><Categorie image={imageCategorie} nom={"légumes"}></Categorie></swiper-slide>
            <swiper-slide><Categorie image={imageCategorie} nom={"légumes"}></Categorie></swiper-slide>
            <swiper-slide><Categorie image={imageCategorie} nom={"légumes"}></Categorie></swiper-slide>
          </swiper-container>
        </div></>
        
    )
}