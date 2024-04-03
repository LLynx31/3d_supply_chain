'use client'

import { withCoalescedInvoke } from "next/dist/lib/coalesced-function"
import { useState } from "react"

export default function ItemPanier({nom,description,prix,quantiteProduct,imageProduct}){
    const linkImage = "https://api.3dsupplychains.com/" + imageProduct
    const imgClose = "/closePanier.png"

    const [quantite, setQuantite] = useState(quantiteProduct)
    const [vu, setVu] = useState('')



    function augmenteQuantite(){
        setQuantite(quantite + 1)
    }

    function diminuQuantite(){
        quantite > 1 && setQuantite(quantite - 1) 
    }
    return (
        <>
            <div className={`flex px-2 ${vu}`}>
            <div className="w-[45%] flex px-1">
                <img alt="boeuf" loading="lazy" className="mr-1" width={55} srcSet={linkImage}></img>
                <div className="flex flex-col justify-center">
                    <div className="text-base font-semibold ">{nom}</div>
                    <div className="text-sm  ">{description} </div>
                </div>
            </div>
            <div className="w-[15%] text-base font-semibold  align-middle flex justify-center items-center"><div>{prix} FCFA</div></div>
            <div className="w-[20%] flex justify-center items-center">
                <div className="flex w-[100px] justify-between items-center px-1 border border-gray-300 py-1">
                    <button onClick={diminuQuantite}>-</button>{quantite}<button onClick={augmenteQuantite}>+</button>
                </div>
            </div>
            <div className="w-[15%] flex justify-center text-base items-center"><div>{prix * quantite} FCFA</div></div>
            <div className="w-[5%] flex justify-center items-center"><button onClick={() => { setVu('hidden') } }><img loading="lazy" srcSet={imgClose}></img></button></div>


            </div>
            <hr className={`${vu}`}></hr>
        </>
    )
}