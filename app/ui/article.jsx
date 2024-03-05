import Link from "next/link"

export default function Article({prix,poids,reduction,nom,image}){

    const imgArticle = "/viande.png"
    const shoppingCart = "/shopping-cart.png"
    return(
    <Link href={"/m/article"}>
    <div  className="relative rounded-[10px] shadow-3xl">
        <img
            loading="lazy"
            srcSet={imgArticle}
            className="h-full w-full object-cover brightness-75 object-center inset-0"
        />

        <div className="absolute top-0 bg-transparent w-full h-full">
            <div className="flex justify-between flex-col h-[80%]">
                <div className="px-2 py-1 bg-jaune md:text-[11px] min-[1210px]:text-[12px] font-bold  mt-1 ml-1 rounded-[5px] w-fit">-34%</div>
                <div className=" text-lg text-center mb-4 font-semibold text-white">Morceau de viande</div>
            </div>

            <div className="flex items-center bg-white justify-between px-1 py-1 h-[20%]">
                <div className="flex  flex-col px-1">
                    <div className="flex items-center">
                        <div className="font-bold w-fit px-2 py-1 bg-jaune md:text-[11px] min-[1210px]:text-[12px] rounded-[5px] mr-1">3500 <span className="text-[10px]">FCFA</span></div>
                        <div className="font-bold w-fit px-2 py-1 md:text-[11px] min-[1210px]:text-[12px] ">2800 <span className="text-[10px]">FCFA</span></div>
                        </div>
                    <div className="md:text-[11px] text-[12px] pl-1 pt-1">5 KG</div>

                </div>
                
                <div className="w-[40px] h-[40px] flex items-center justify-center rounded-[25%] mr-2 bg-rouge">
                        <img
                            loading="lazy"
                            srcSet={shoppingCart}
                            className="h-[20px] w-[20px] "
                        />
                </div>

            </div>
        </div>
    
    </div>
    </Link>
    
    )
}