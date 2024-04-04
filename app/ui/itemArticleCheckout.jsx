export function ItemArticleCheckout({image,nom,qte,prix}){
    return(
        <div className="flex gap-2">
            <img srcSet={"https://api.3dsupplychains.com/"+image} className="w-[60px]" alt={nom} loading="lazy"></img>
            <div className="flex flex-col">
                <div className="text-base">{nom}</div>
                <div className="text-base">QTE: {qte}</div>
                <div className="text-base">prix: {prix}</div>
            </div>
        </div>
    )
}