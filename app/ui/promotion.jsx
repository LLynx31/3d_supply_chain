'use client'

import Link from "next/link"

import {motion} from "framer-motion"

export default function Promotion({reduction="",nom,image,code}){

    const shoppingCart = "/shopping-cart.png"

    //if(code) code =  Number(code.replace(/[^\d]/g, ""))
    return(
 
    <motion.div whileInView={{scale:[1,1.05,1],transition:{duration:0.9,repeat:Infinity, repeatDelay:"1"}}}  whileHover={{scale:1.1, transition:{duration:0.3}}} className="relative my-2 rounded-[10px] h-[250px] shadow-3xl">
        {image ?<img
            loading="lazy"
            srcSet={"https://api.3dsupplychains.com/" + image}
            className="h-full w-full object-cover brightness-75 object-center inset-0"
            alt={nom}
        /> : <div className="h-full w-full bg-slate-300"></div>}

        <div className="absolute top-0 bg-transparent w-full h-full">
            <div className="flex justify-between flex-col h-[80%]">
                <div className="px-2 py-1 bg-jaune  text-[12px] min-[1210px]:text-[12px] font-bold  mt-1 ml-1 rounded-[5px] w-fit">{parseInt(reduction)} % de reduction </div>
                
                <div className="text-center my-6 text-white font-bold text-base sm:text-lg">Découvrez</div>
            </div>

            <div className="flex items-center bg-white justify-between px-1 h-[25%]">
                <div className="flex  flex-col px-1">
                    <div className=" text-base  text-center mb-4 font-semibold">{nom} sur <span className="text-rouge">{code}</span></div>
                </div>    
            </div>
        </div>
    
    </motion.div>

    
    )
}