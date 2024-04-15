'use client'

import Link from "next/link"

import {motion} from "framer-motion"


export default function Article({price,poids,newPrice,nom,image,code}){

    const imgArticle = "/viande.png"
    const shoppingCart = "/shopping-cart.png"

    if(code) code =  Number(code.replace(/[^\d]/g, ""))
    return(
    <Link className="h-fit" href={"/m/article/" + code}>
    <motion.div whileHover={{scale:1.1}} className="relative rounded-[10px] h-[250px] shadow-3xl">
        {image ?<img
            loading="lazy"
            srcSet={"https://api.3dsupplychains.com/" + image}
            className="h-full w-full object-cover brightness-75 object-center inset-0"
            alt={nom}
        /> : <div className="h-full w-full bg-slate-300"></div>}

        <div className="absolute top-0 bg-transparent w-full h-full">
            <div className="flex justify-between flex-col h-[65%]">
                <div className="px-2 py-1 bg-jaune  text-[12px] min-[1210px]:text-[12px] font-bold  mt-1 ml-1 rounded-[5px] w-fit">{( (parseInt(price) - parseInt(newPrice)) * 100)/parseInt(price)}% reduction</div>
                <div className=" text-base sm:text-lg text-center mb-4 font-semibold text-white">{nom}</div>
            </div>

            <div className="flex items-center bg-white justify-between px-1 py-1 h-[35%]">
                <div className="flex  flex-col px-1">
                    <div className="flex flex-col items-center">
                        <div className="font-bold w-fit px-2 py-1 mb-1 bg-jaune text-[11px] min-[1210px]:text-[12px] rounded-[5px] ">{newPrice} <span className="text-[10px]">FCFA</span></div>
                        { parseInt(newPrice) !== parseInt(price) && <div className="font-bold w-fit  py-1 text-[11px] min-[1210px]:text-[12px] "><s>{parseInt(price)} <span className="text-[10px]">FCFA</span></s></div>}
                        </div>
                        <div className="md:text-[11px] text-[12px] px-2">{poids} -</div>

                    </div>
                
                    <div className="w-[40px] h-[40px] flex items-center justify-center rounded-[25%] mr-1 bg-rouge">
                        <img
                            loading="lazy"
                            srcSet={shoppingCart}
                            className="h-[20px] w-[20px] "
                        />
                    </div>
            </div>
        </div>
    
    </motion.div>
    </Link>
    
    )
}