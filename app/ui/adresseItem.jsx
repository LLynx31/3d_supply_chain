'use client'
import { useState } from "react"

export function AdresseItem(){

    const [changeView, setChangeView] = useState(false)
    const [changeText, setChangeText] = useState("Changer")

    return( 
        <div>

            <div className="flex text-base justify-between bg-emerald-50 px-2 rounded-md py-2 w-full">
                <div className="text-gray-500">default</div>

                    <div>village djahakro, yamoussoukro, Cote d'Ivoire</div>

                    <button onClick={() => {
                        setChangeView(!changeView), changeText == "Changer" ? setChangeText("Fermer") : setChangeText("Changer")}}  className=" text-rouge">{changeText}</button>
            </div>
                        
            
            <div className={!changeView && "hidden"}>
                    <h2 className="font-bold text-lg mt-5">Modifier l'adresse</h2>
                    <div className="w-full mt-3.5">
                        <div className="text-base">Ville</div>
                            <input className="w-full border border-gray-300 px-1 py-2" placeholder="Sagoe"></input>
                        </div>

                        <div className="w-full mt-5">
                        <div className="text-base">Commune</div>
                            <input className="w-full border border-gray-300 px-1 py-2" type="email" placeholder="Sagoe"></input>
                        </div>

                        <div className="w-full mt-5">
                            <div className="text-base">Information additionnel</div>
                            <input className="w-full border border-gray-300 px-1 py-2"  placeholder="Sagoe"></input>
                        </div>

                        <button className="mt-6 text-white w-full bg-rouge text-center py-2.5 rounded-md">SAUVEGARDER</button>
            </div>
                                    

                     

        </div>
    )
}

export function AddAdress(){

    const [formAddAddressView, setFormAddAddressView] = useState(false)

    return(

        <>
                
            <button onClick={()=> setFormAddAddressView(true)} className={formAddAddressView ? "hidden" : "mt-6 text-white w-full bg-rouge text-center py-2.5 rounded-md"}>AJOUTER UNE NOUVELLE ADRESSE</button>

            <div className={!formAddAddressView && "hidden"}>
                <h2 className="font-bold text-lg mt-5">Ajouter une adresse</h2>
                <div className="w-full mt-3.5">
                    <div className="text-base">Ville</div>
                    <input className="w-full border border-gray-300 px-1 py-2" placeholder="Sagoe"></input>
                </div>

                <div className="w-full mt-5">
                    <div className="text-base">Commune</div>
                    <input className="w-full border border-gray-300 px-1 py-2" type="email" placeholder="Sagoe"></input>
                </div>

                <div className="w-full mt-5">
                    <div className="text-base">Information additionnel</div>
                    <input className="w-full border border-gray-300 px-1 py-2" placeholder="Sagoe"></input>
                </div>

                <button className="mt-6 text-white w-full bg-rouge text-center py-2.5 rounded-md">SAUVEGARDER</button>
            </div></>
    )
}