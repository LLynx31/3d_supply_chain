'use client'
import ItemPanier from "../../ui/itemPanier";
import { getPanier } from "@/app/features/getData";
import LoadingSpinner from "@/app/ui/loading";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";


import { motion } from "framer-motion"

export default function Panier(){

    const [dataPanier, setDataPanier] = useState(null)

    const router  = useRouter()

    useEffect(()=>{
        async function recupererPanier(){
            try {
                const panier =  await getPanier()
                //console.log(panier['hydra:member'])
              
                    setDataPanier(panier['hydra:member'])
 
            } catch (error) {
                console.error(error)
            }
        }

        recupererPanier()
    }, [])

    if (dataPanier) {

       
        const listPanier = dataPanier[0]?.detailDocuments.map(panier => <ItemPanier id={panier['@id']} key={panier['@id']} imageProduct={panier.produit.imageProduits[0]?.path} nom={panier.produit.nom} description={panier.produit.description} prix={parseInt(panier.prixUnitaire)} quantiteProduct={panier.quantite}></ItemPanier>)


        return (
            <motion.div initial={{opacity: 0, y:50}} animate={{opacity:1, y:0}} transition={{duration:0.3}} className="mt-8 px-3 sm:px-8 pt-5">
                <h1 className="text-center text-xl font-bold">Mon panier</h1>
                <hr></hr>
                <div className="mt-3 flex items-center flex-col xlg:flex-row">
                    <div className="w-full min-h-[250px]">
                        <div className="bg-gray-200 flex px-2 py-2 mb-4">
                            <div className="w-[35%] text-base text-center">NOM DU PRODUIT</div>
                            <div className="w-[15%] text-base text-center">PRIX</div>
                            <div className="w-[30%] text-base text-center">QUANTITE</div>
                            <div className="w-[15%] text-base text-center ">TOTAL</div>
                        </div>
    
                        <div className="flex flex-col gap-5">
                            {listPanier}
                        </div>
    
                    </div>
    
                    <div className=" hidden lg:w-[32%] border rounded-lg border-gray-200 px-3 py-5 h-fit ">
                        <div className="text-base">Entrez votre code promo</div>
    
                        <div className="w-full mt-5 flex ">
    
                            <input className="block w-[190px] text-base border border-gray-300 p-1"></input>
                            
                            <button className="w-full bg-black text-white text-base ml-2">SOUMETTRE</button>
                        </div>
    
                        <hr className="mt-8"></hr>
    
                        <div className="mt-8">
                            <div className="flex justify-between mb-3">
                                <div className="text-base ">sous-total</div>
                                <div className="text-base font-bold">{parseInt(dataPanier[0]?.montantHt)} FCFA</div>
                            </div>
    
    
                            <div className="flex justify-between mb-3">
                                <div className="text-base ">livraison</div>
                                <div className="text-base font-bold">10 + {parseInt(dataPanier[0]?.montantHt)} EURO</div>
                            </div>
    
                            <div className="flex justify-between mb-8">
                                <div className="text-base ">total</div>
                                <div className="text-base font-bold">{parseInt(dataPanier[0]?.montantHt) + 10} EURO</div>
                            </div>
    
                            <button onClick={()=>router.push("/m/checkout")}  className="text-white text-base w-full bg-rouge text-center py-3 rounded-md">verifier la commande</button>
                        </div>

                    </div>
                    
                    
                    <button disabled={dataPanier[0]?.detailDocuments <= 0 ? true : false} onClick={()=>router.push("/m/checkout")} className="text-white text-base w-fit px-5  bg-rouge text-center py-3 rounded-md">VERIFICATION DE LA COMMANDE</button>
                </div>
                
            </motion.div>
        )
    } else {
        return <LoadingSpinner></LoadingSpinner>
    }
    
}