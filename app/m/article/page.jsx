'use client'
import Article from "../../ui/article"

import { useState } from "react"

export default function ArticleView(){

    const imgBoeuf = "/boeuf.png"
    const imgShoppingCart = "/shopping-cart.png"
    const imgDangerCircle = "/Danger_Circle.png"
    const imgClose = "/x.png"

    const [quantite, setQuantite] = useState(1)
    const [ajoutReussi, setAjoutReussi] = useState('hidden')
    const [swipeDescription, setSwipDescritption] = useState('description')
    const [swipeImageProduct, setImageProduct] = useState(imgBoeuf)


    console.log(swipeDescription)

    function augmenteQuantite(){
        setQuantite(quantite + 1)
    }

    function diminuQuantite(){
        quantite > 1 && setQuantite(quantite - 1) 
    }

    return(
        <div className="relative px-8 pt-5">

            <div className={"absolute right-0 flex py-2 justify-center px-2 bg-teal-100 rounded-xl w-fit transition-[display] " + ajoutReussi }>
                <img className="mr-2" loading="lazy" srcSet={imgDangerCircle}></img>
                <div>Viande de Porc - 5KG ajouté au panier avec succès</div>
                <button onClick={()=> setAjoutReussi('hidden')}><img loading="lazy" srcSet={imgClose}></img></button>
            </div>

            <div className="text-base  font-semibold mb-5">Acceuil &gt; <span className="text-[#9ca3af] font-medium">Viande de porc</span>  </div>

            {/* article, ses images et sa description */}
            <div className="flex ">
            
                {/* image en mignature */}
                <div className="flex flex-col mr-8 w-[120px]">
                    <img loading="lazy" onClick={()=>setImageProduct(imgBoeuf)} srcSet={imgBoeuf} alt="boeuf" className="rounded-md w-[80px] h-[80px] my-3"></img>
                    <img loading="lazy" onClick={()=>setImageProduct(imgBoeuf)} srcSet={imgBoeuf} alt="boeuf" className="rounded-md w-[80px] h-[80px] my-3"></img>
                    <img loading="lazy" onClick={()=>setImageProduct(imgBoeuf)} srcSet={imgBoeuf} alt="boeuf" className="rounded-md w-[80px] h-[80px] my-3"></img>
                </div>
                {/* fin image en mignature */}

                {/* image en grandeur nature */}
                <img loading="lazy" srcSet={swipeImageProduct} alt="boeuf" className="w-[450px]"></img>


                {/* description */}
                <div className="ml-8 w-fit">
                    <h1 className="text-2xl font-bold ">Viande de porc</h1>
                    <div className="text-base  text-[#9ca3af]">5kg - 2 morceaux</div>
                 
                    <div className="px-3 py-3 my-3 rounded-md bg-teal-50 border border-teal-300 text-base ">Disponibilité : <span className="text-teal-400">En stock</span></div>

                    <div className="text-xl ">10 000 FCFA</div>

                    <p className="mt-3 text-[17px] ">
                        lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsumlorem ipsum dolor sit lorem ipsum dolor sit 
                    </p>

                    <div className="flex w-[150px] justify-between bg-slate-100 px-5 rounded-3xl py-2 mt-3">
                        <button onClick={diminuQuantite}>-</button>{quantite}<button onClick={augmenteQuantite}>+</button>
                    </div>

                    <button onClick={() => setAjoutReussi('')} className="flex justify-center items-center  text-base text-white w-full bg-rouge rounded-xl px-3 py-3 mt-5">
                        <img loading="lazy" alt="shopping cart" src={imgShoppingCart} className="h-[20px] w-[20px]"></img>
                        <div className="ml-5">Ajouter au panier</div>
                    </button>
                </div>
            </div>
            {/* article, ses images et sa description */}

            {/* description du bas*/}

            <div className="mt-5 h-[250px]">

                <div  className="border-b border-b-gray-300 flex">
                    <div onClick={() => setSwipDescritption('description')} className={swipeDescription == 'description' ? "cursor-pointer px-2 py-2 border-b-2 border-b-rouge" : "cursor-pointer px-2 py-2 border-b-2 border-b-white"}>
                        Description
                    </div>

                    <div  onClick={() => {setSwipDescritption('infoSupp') }} className={swipeDescription == 'infoSupp' ? "cursor-pointer px-2 py-2 border-b-2 border-b-rouge" : "cursor-pointer px-2 py-2 border-b-2 border-b-white" }>
                        Informations supplémentaires
                    </div>

                    <div  onClick={() => setSwipDescritption('conservation')} className={swipeDescription == 'conservation' ? "cursor-pointer px-2 py-2 border-b-2 border-b-rouge" : "cursor-pointer px-2 py-2 border-b-2 border-b-white"}>
                        Conservation
                    </div>
                </div>

                <div className={swipeDescription == 'description' ? "mt-5" : "hidden"}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque a, reprehenderit, eligendi illum, quasi fugit veritatis aut obcaecati eos atque officiis omnis excepturi quod quam. Voluptatem quia nam nihil voluptates!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, delectus ab corrupti magnam optio, quia vero eveniet quos itaque corporis exercitationem? Possimus doloribus deleniti quidem suscipit voluptatem. Excepturi, aperiam itaque.
                </div>


                <div  className={swipeDescription == 'infoSupp' ? "mt-5" : "hidden"}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                </div>


                <div className={swipeDescription == 'conservation' ? "mt-5" : "hidden"}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque a, reprehenderit, eligendi illum, quasi fugit veritatis aut obcaecati eos atque officiis omnis excepturi quod quam. Voluptatem quia nam nihil voluptates!
                    
                </div>
                


            </div>
            {/* fin description du bas */}


            {/* produit similaire */}
            <div className="mt-36 mb-28">
                <h1 className="text-2xl font-bold  mb-5">Produit similaire</h1>
                <div className="grid grid-cols-5 gap-4">
                    <Article></Article>
                    <Article></Article>
                    <Article></Article>
                    <Article></Article>
                    <Article></Article>
                </div>
            </div>
            {/* fin produit similaire */}


        </div>
        
    )
}