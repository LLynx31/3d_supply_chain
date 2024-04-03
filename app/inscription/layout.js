import Link from "next/link"

export default function LayoutInscription({children}){
    const logo = "/logo.png"
    return(
        <div >
            <div className="w-full flex justify-center py-2 shadow-xl mb-6">
                <Link href={"/"}><img loading="lazy" width={150} alt="logo" srcSet={logo}></img></Link>
            </div>
            <div className="mx-10">
                {children}
            </div>
        </div>
    )
}