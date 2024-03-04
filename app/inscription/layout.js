
export default function LayoutInscription({children}){
    const logo = "/logo.png"
    return(
        <div >
            <div className="w-full flex justify-center py-2 shadow-xl mb-6">
                <img loading="lazy" width={150} alt="logo" srcSet={logo}></img>
            </div>
            <div className="mx-10">
                {children}
            </div>
        </div>
    )
}