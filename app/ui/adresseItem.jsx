'use client'
import { useState } from "react"
import { postAdress } from "../features/postData"
import { pacthAdress } from "../features/pacthData"

function AdresseItem({adresse,nbr}){
    const [changeView, setChangeView] = useState(false)
    const [changeText, setChangeText] = useState("Changer")
    const [ajoutReussi, setAjoutReussi] = useState('hidden')

    const imgDangerCircle = "/Danger_Circle.png"
    const imgClose = "/x.png"

    const [dataAdress,setDataAdress] = useState({
        ville:"",
        commune:"",
        infoSup:"",
        pays:""
    })

    async function changeAdresse(){
        try {
            const response =  await pacthAdress(dataAdress,adresse['@id'])
            setAjoutReussi('')
        } catch (error) {
            console.log(error)
        }
    }

    return(
    <div>

        <div className={"fixed right-7 flex py-2 justify-center px-2 bg-teal-100 rounded-xl w-fit transition-[display] " + ajoutReussi }>
            <img className="mr-2" loading="lazy" srcSet={imgDangerCircle}></img>
            <div className="text-base">Adresse ajoutée, rafraichissez </div>
            <button onClick={()=> setAjoutReussi('hidden')}><img loading="lazy" srcSet={imgClose}></img></button>
        </div>
        <div className="flex text-base justify-between my-2 bg-emerald-50 px-2 rounded-md py-2 w-full">
            <div className="text-gray-500">{nbr}</div>
        
                {adresse.pays + ", " + adresse.ville + ", " + adresse.commune}
        
                <button onClick={() => {
                setChangeView(!changeView), changeText == "Changer" ? setChangeText("Fermer") : setChangeText("Changer")}}  className=" text-rouge">{changeText}</button>
            </div>
                                
                    
            <form className={!changeView ? "hidden" :  ""} action={changeAdresse}>
                <h2 className="font-bold text-lg mt-5">Modifier l'adresse</h2>
                <div className="w-full mt-3.5">
                        <div className="text-base">Pays</div>
                        <input className="w-full border border-gray-300 px-1 py-2" value={dataAdress.pays} onChange={e => setDataAdress({...dataAdress, pays: e.target.value})} type="text" placeholder="Sagoe"></input>
                </div>
                <div className="w-full mt-3.5">
                    <div className="text-base">Ville</div>
                    <input className="w-full border border-gray-300 px-1 py-2" value={dataAdress.ville} onChange={e => setDataAdress({...dataAdress, ville: e.target.value})} type="text" placeholder="Sagoe"></input>
                </div>

                <div className="w-full mt-5">
                    <div className="text-base">Commune</div>
                    <input className="w-full border border-gray-300 px-1 py-2" value={dataAdress.commune} onChange={e => setDataAdress({...dataAdress, commune: e.target.value})} type="text" placeholder="Sagoe"></input>
                </div>

                <div className="w-full mt-5">
                    <div className="text-base">Information additionnel</div>
                    <input className="w-full border border-gray-300 px-1 py-2" value={dataAdress.infoSup} onChange={e => setDataAdress({...dataAdress, infoSup: e.target.value})} type="text" placeholder="Sagoe"></input>
                </div>

                <button type="submit" className="mt-6 text-white w-full bg-rouge text-center py-2.5 rounded-md">SAUVEGARDER</button>
        
            </form>
        </div>)

}

export function Adresse({Adress}){

    const [changeView, setChangeView] = useState(false)
    const [changeText, setChangeText] = useState("Changer")

    let i = 0
    const listAdress = Adress.map((e)=>
    {
        i = i+1
        return <AdresseItem key={i} nbr={i} adresse={e}></AdresseItem>}
    )
    return( 
        <div>

            
            {listAdress}                        

                     

        </div>
    )
}

export function AddAdress(){

    const [ajoutReussi, setAjoutReussi] = useState('hidden')

    const [formAddAddressView, setFormAddAddressView] = useState(false)

    const [dataAdress,setDataAdress] = useState({
        ville:"",
        commune:"",
        infoSup:"",
        pays:""
    })

    const imgDangerCircle = "/Danger_Circle.png"
    const imgClose = "/x.png"

    async function actionForm(dataForm){

        try{
            console.log(dataForm)
            const response = await postAdress(dataForm) 
            setAjoutReussi('')
            setDataAdress({ville:"",
            commune:"",
            infoSup:"",
            pays:""})
        } 
        catch(error) {
            console.error(error)
        }
        
    }

    return(

        <>
            <div className={"fixed right-7 flex py-2 justify-center px-2 bg-teal-100 rounded-xl w-fit transition-[display] " + ajoutReussi }>
                    <img className="mr-2" loading="lazy" srcSet={imgDangerCircle}></img>
                    <div className="text-base">Adresse ajoutée, rafraichissez §</div>
                    <button onClick={()=> setAjoutReussi('hidden')}><img loading="lazy" srcSet={imgClose}></img></button>
                </div>
                
            <button onClick={()=> setFormAddAddressView(true)} className={formAddAddressView ? "hidden" : "mt-6 text-white w-full bg-rouge text-center py-2.5 rounded-md"}>AJOUTER UNE NOUVELLE ADRESSE</button>

            <form className={!formAddAddressView ? "hidden" : ""} action={()=>actionForm(dataAdress)}>
                <h2 className="font-bold text-lg mt-5">Ajouter une adresse</h2>
                <div className="w-full mt-5">
                <div className="text-base">Pays</div>
                    <input className="w-full border border-gray-300 px-1 py-2" value={dataAdress.pays} onChange={e => setDataAdress({...dataAdress, pays: e.target.value})} type="text" placeholder="Sagoe"></input>
                </div>
                <div className="w-full mt-3.5">
                    <div className="text-base">Ville</div>
                    <input className="w-full border border-gray-300 px-1 py-2" value={dataAdress.ville} onChange={e => setDataAdress({...dataAdress, ville: e.target.value})} type="text" placeholder="Sagoe"></input>
                </div>

                <div className="w-full mt-5">
                    <div className="text-base">Commune</div>
                    <input className="w-full border border-gray-300 px-1 py-2" value={dataAdress.commune} onChange={e => setDataAdress({...dataAdress, commune: e.target.value})} type="text" placeholder="Sagoe"></input>
                </div>

                <div className="w-full mt-5">
                    <div className="text-base">Information additionnel</div>
                    <input className="w-full border border-gray-300 px-1 py-2" value={dataAdress.infoSup} onChange={e => setDataAdress({...dataAdress, infoSup: e.target.value})} type="text" placeholder="Sagoe"></input>
                </div>

                <button type="submit" className="mt-6 text-white w-full bg-rouge text-center py-2.5 rounded-md">SAUVEGARDER</button>
            </form></>
    )
}