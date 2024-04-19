'use client'

import { getProduct, getProductSearch } from "@/app/features/getData"
import Article from "@/app/ui/article"
import LoadingSpinner from "@/app/ui/loading"
import { useEffect,useState } from "react"

import { motion } from "framer-motion"

export default function PageRecherche({params}){

    const [dataProduct, setDataProduct] = useState(null)
    const [pageView, setPageView] = useState('1')

    useEffect(()=>{
        async function rechercherProduit(){
            try {
                const response = await getProductSearch(params.code,pageView)
                if(response['hydra:member'].length <= 0){
                    setDataProduct('nothing')
                } 
                else {
                    setDataProduct(response)
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
            <motion.div initial={{opacity: 0, y:50}} animate={{opacity:1, y:0}} transition={{duration:0.3}} className="text-center text-base mx-8 mt-8 text-slate-500">
                Aucun produit correspondant, entrez le nom du produit que vous rechercher
            </motion.div>
        )
    } else {

        //console.log(dataProduct)
        const listProduct = dataProduct['hydra:member'].map(product => <Article poids={product.description2} code={product.id} key={product.id} nom={product.nom} image={product.imageProduits[0]?.path} price={product.price} newPrice={product.newPrice}></Article>)

        return(
            <motion.div initial={{opacity: 0, y:50}} animate={{opacity:1, y:0}} transition={{duration:0.3}} className="mx-8 mt-8 gap-8 grid grid-cols-2 sm:grid-cols-5">
                
                {listProduct}
            </motion.div>
        )
    }


}