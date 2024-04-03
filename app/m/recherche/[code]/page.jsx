'use client'

import { getProduct } from "@/app/features/getData"
import Article from "@/app/ui/article"
import LoadingSpinner from "@/app/ui/loading"
import { useEffect,useState } from "react"

export default function PageRecherche({params}){

    const [dataProduct, setDataProduct] = useState(null)

    useEffect(()=>{
        async function rechercherProduit(){
            try {
                const response = await getProduct(params.code)
                if(response['hydra:member'].length <= 0){
                    setDataProduct('nothing')
                } 
                else {
                    setDataProduct(response['hydra:member'])
                }
            } catch (error) {
                
            }
        }

        rechercherProduit()
    },[])


    if(!dataProduct){
        return (
            <LoadingSpinner></LoadingSpinner>
        )
    }
    else if (dataProduct == 'nothing'){
        return (
            <div className="text-center text-base mx-8 mt-8 text-slate-500">
                Aucun produit correspondant, entrez le nom du produit que vous rechercher
            </div>
        )
    } else {

        const listProduct = dataProduct.map(product => <Article code={product["@id"]} key={product["@id"]} nom={product.nom} image={product.imageProduits[0].path} prix={product.priceProduits[0].valeur} reduction={product.priceProduits[1].valeur}></Article>)

        return(
            <div className="mx-8 mt-8 grid grid-cols-2 sm:grid-cols-5">
                
                {listProduct}
            </div>
        )
    }


}