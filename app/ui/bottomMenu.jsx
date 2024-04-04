'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function BottomMenu(){

    const router = useRouter()

    const [isMenuClicked, setMenuCliked] = useState('')
    const [menuOpen, setMenuOpen] = useState(false)


    const FirstMenu = () => <div className="sm:hidden flex justify-between items-center py-4 px-8 bg-white z-50 sticky bottom-0">
    <div>
        <svg  width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21M3 6H21M3 18H21" stroke={isMenuClicked == 'toggleMenu' ? "#F6CB05" : "black"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
    <div onClick={()=>{
        router.push("/m/recherche")
        setMenuCliked('search')
    }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke={isMenuClicked == 'search' ? "#F6CB05" : "black"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 20.9999L16.65 16.6499" stroke={isMenuClicked == 'search' ? "#F6CB05" : "black"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
    <div onClick={()=>{
        router.push("/")
        setMenuCliked('home')
    }}>
        <svg   width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 17H16M11.0177 2.764L4.23539 8.03912C3.78202 8.39175 3.55534 8.56806 3.39203 8.78886C3.24737 8.98444 3.1396 9.20478 3.07403 9.43905C3 9.70352 3 9.9907 3 10.5651V17.8C3 18.9201 3 19.4801 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4801 21 18.9201 21 17.8V10.5651C21 9.9907 21 9.70352 20.926 9.43905C20.8604 9.20478 20.7526 8.98444 20.608 8.78886C20.4447 8.56806 20.218 8.39175 19.7646 8.03913L12.9823 2.764C12.631 2.49075 12.4553 2.35412 12.2613 2.3016C12.0902 2.25526 11.9098 2.25526 11.7387 2.3016C11.5447 2.35412 11.369 2.49075 11.0177 2.764Z" stroke={isMenuClicked == 'home' ? "#F6CB05" : "black"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
    
    <div onClick={()=>{
        router.push("/m/panier")
        setMenuCliked('panier')
    }}>
        <svg  width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke={isMenuClicked == 'panier' ? "#F6CB05" : "black"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 6H21" stroke={isMenuClicked == 'panier' ? "#F6CB05" : "black"} strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke={isMenuClicked == 'panier' ? "#F6CB05" : "black"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
    <div onClick={()=>{
        router.push("/m/compte")
        setMenuCliked('user')
    }}>
        <svg  width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke={isMenuClicked == 'user' ? "#F6CB05" : "black"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke={isMenuClicked == 'user' ? "#F6CB05" : "black"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
</div>


    return (
        <FirstMenu></FirstMenu>
    )
}