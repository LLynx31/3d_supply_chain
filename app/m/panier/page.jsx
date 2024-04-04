'use client'
import ItemPanier from "../../ui/itemPanier";
import { getPanier } from "@/app/features/getData";
import LoadingSpinner from "@/app/ui/loading";
import { useEffect,useState } from "react";

export default function Panier(){

    const [dataPanier, setDataPanier] = useState(null)

    useEffect(()=>{
        async function recupererPanier(){
            try {
                const panier =  await getPanier()
                //console.log(panier['hydra:member'])
                if(panier['hydra:member'].length <= 0){
                    setDataPanier(panier['hydra:member'])
                }else{
                    setDataPanier(panier['hydra:member'][0].detailDocuments)
                }
            } catch (error) {
                console.error(error)
            }
        }

        recupererPanier()
    }, [])

    if (dataPanier) {

        console.log(dataPanier)
        const listPanier = dataPanier.map(panier => <ItemPanier key={panier['@id']} imageProduct={panier.produit.imageProduits[0].path} nom={panier.produit.nom} description={panier.produit.description} prix={parseInt(panier.prixUnitaire)} quantiteProduct={panier.quantite}></ItemPanier>)


        return (
            <div className="mt-8 px-3 sm:px-8 pt-5">
                <h1 className="text-center text-xl font-bold">Mon panier</h1>
                <hr></hr>
                <div className="mt-3 flex flex-col lg:flex-row">
                    <div className="lg:w-[68%] mr-5">
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
    
                    <div className="lg:w-[32%] border rounded-lg border-gray-200 px-3 py-5 h-fit ">
                        <div className="text-base">Entrez votre code promo</div>
    
                        <div className="w-full mt-5 flex ">
    
                            <input className="block w-[190px] text-base border border-gray-300 p-1"></input>
                            
                            <button className="w-full bg-black text-white text-base ml-2">SOUMETTRE</button>
                        </div>
    
                        <hr className="mt-8"></hr>
    
                        <div className="mt-8">
                            <div className="flex justify-between mb-3">
                                <div className="text-base ">sous-total</div>
                                <div className="text-base font-bold">5000 FCFA</div>
                            </div>
    
                            <div className="flex justify-between mb-3">
                                <div className="text-base ">sous-total</div>
                                <div className="text-base font-bold">5000 FCFA</div>
                            </div>
    
                            <div className="flex justify-between mb-3">
                                <div className="text-base ">livraison</div>
                                <div className="text-base font-bold">1000 + 5000 FCFA</div>
                            </div>
    
                            <div className="flex justify-between mb-8">
                                <div className="text-base ">total</div>
                                <div className="text-base font-bold">6000 FCFA</div>
                            </div>
    
                            <button className="text-white text-base w-full bg-rouge text-center py-3 rounded-md">VALIDER MA COMMANDE</button>
                        </div>
    
    
    
                    </div>
                </div>
                
            </div>
        )
    } else {
        return <LoadingSpinner></LoadingSpinner>
    }
    
}