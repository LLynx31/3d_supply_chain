export default function CompteLayout({children}){
    return(
        <div>
            <div className="text-2xl sm:mt-1 mt-5 flex justify-center items-center bg-amber-200 h-[250px] border-b border-b-gray-300"><div>Compte</div></div>
            {children}
        </div>
    )
}