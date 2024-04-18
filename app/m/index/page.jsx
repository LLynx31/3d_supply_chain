'use client';
import Article from "../../ui/article";
import { Categories } from "../../ui/categorie";
import LoadingSpinner from "../../ui/loading";
import Temoignages from "../../ui/temoignage";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { getAllPromotion } from "@/app/features/getData";
import Promotion from "@/app/ui/promotion";



export default function PageIndex() {

  const banner = "/barniere_site_3D_supply_chain.jpg";
  const processus1 = "/processus-1.png";
  const processus2 = "/processus-2.png";
  const processus3 = "/processus-3.png";

  const [categorieInView, setCategorieInView] = useState('promotion');

  const refBestSeller = useRef(null);
  const refArrivage = useRef(null);
  const refOffreFlash = useRef(null);
  const refPromotion = useRef(null);

  useEffect(() => {

    const observerBestSeller = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // L'élément est en vue
          setCategorieInView('best seller');
        }
      });
    });

    const observerArrival = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // L'élément est en vue
          setCategorieInView('arrivage');
        }
      });
    });

    const observerPromo = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // L'élément est en vue
          setCategorieInView('promotion');
        }
      });
    });

    const observerOffreFlash = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // L'élément est en vue
          setCategorieInView('offre flash');
        }
      });
    });

    observerPromo.observe(refPromotion.current);
    observerBestSeller.observe(refBestSeller.current);
    observerArrival.observe(refArrivage.current);
    observerOffreFlash.observe(refOffreFlash.current);


  });


  const [dataProduct, setDataProduct] = useState(null);
  const [dataPromotion, setDataPromotion] = useState(null);

  const [pageViewBestSeller, setPageViewBestSeller] = useState("/api/produits?page=1");
  const [pageViewNewArrivage, setPageViewNewArrivage] = useState("/api/produits?page=1");
  const [pageViewOffreFlash, setPageViewOffreFlash] = useState("/api/produits?page=1");

  let pages = null;

  useEffect(() => {
    fetch("https://api.3dsupplychains.com" + pageViewBestSeller)
      .then((response) => response.json())
      //.then((responseParse)=>console.log(responseParse))
      .then((responseParse) => setDataProduct(responseParse));

  }, [pageViewBestSeller]);


  useEffect(() => {
    fetch("https://api.3dsupplychains.com" + pageViewNewArrivage)
      .then((response) => response.json())
      //.then((responseParse)=>console.log(responseParse))
      .then((responseParse) => setDataProduct(responseParse));

  }, [pageViewNewArrivage]);



  useEffect(() => {
    fetch("https://api.3dsupplychains.com" + pageViewOffreFlash)
      .then((response) => response.json())
      //.then((responseParse)=>console.log(responseParse))
      .then((responseParse) => setDataProduct(responseParse));

  }, [pageViewOffreFlash]);



  useEffect(() => {
    async function recupPromotion() {
      try {
        const response = await getAllPromotion();
        setDataPromotion(response['hydra:member']);
      } catch (error) {
        console.log(error);
      }
    }

    recupPromotion();

  }, []);



  if (dataProduct && dataPromotion) {
    console.log(dataPromotion);
    const listDataProduct = dataProduct["hydra:member"].map(product => <Article poids={product.description2} code={product.id} key={product["@id"]} nom={product.nom} image={product.imageProduits[0]?.path} price={product.price} newPrice={product.newPrice}></Article>);

    const listPromotion = dataPromotion.map(promotion => <Promotion key={promotion['@id']} nom={promotion.libelle} reduction={promotion.pourcentage} image={promotion.medias[0].path} code={promotion.categorie ? promotion.categorie.libelle : promotion.sousCategorie.libelle}></Promotion>);




    return (

      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>


        <div className="z-0">

          <div className="px-3 sm:px-8 pt-5">

            <div className="w-full  overflow-hidden">

              <img className="object-bottom w-full h-full mb-8"
                loading="lazy"
                srcSet={banner}
              ></img>
            </div>

            <Categories></Categories>


            <div className="pt-1 gap-9 mt-8 flex ">

              {/* barre de navigation */}
              <div className="sticky md:block hidden top-5 h-fit items-stretch content-end flex-wrap flex md:w-[200px] flex-col ">
                <div className="text-black text-xl font-bold w-full">
                  Navigation
                </div>

                <div className="items-center flex gap-1.5 mt-2.5 px-2">
                  <div className={categorieInView == 'promotion' ? 'bg-rouge flex w-[8px] shrink-0 h-[8px]  flex-col my-auto rounded-[50%]' : 'bg-white flex w-[8px] shrink-0 h-[8px]  flex-col my-auto rounded-[50%]'} />
                  <div className="text-black text-base font-medium self-stretch">
                    Promotions
                  </div>
                </div>

                <div className="items-center flex gap-1.5 mt-2.5 px-2">
                  <div className={categorieInView == 'best seller' ? 'bg-rouge flex w-[8px] shrink-0 h-[8px]  flex-col my-auto rounded-[50%]' : 'bg-white flex w-[8px] shrink-0 h-[8px]  flex-col my-auto rounded-[50%]'} />
                  <div className="text-black text-base font-medium self-stretch">
                    Best sellers
                  </div>
                </div>
                <div className="items-center flex gap-1.5 mt-2.5 px-2">
                  <div className={categorieInView == 'arrivage' ? 'bg-rouge flex w-[8px] shrink-0 h-[8px]  flex-col my-auto rounded-[50%]' : 'bg-white flex w-[8px] shrink-0 h-[8px]  flex-col my-auto rounded-[50%]'} />
                  <div className="text-black text-base font-medium self-stretch">
                    Nouveaux arrivages
                  </div>
                </div>
                <div className="items-center flex gap-1.5 mt-2.5 px-2">
                  <div className={categorieInView == 'offre flash' ? "bg-rouge flex w-[8px] shrink-0 h-[8px]  flex-col my-auto rounded-[50%]" : "bg-white flex w-[8px] shrink-0 h-[8px]  flex-col my-auto rounded-[50%]"} />
                  <div className="text-black text-base font-medium self-stretch">
                    Offres Flash
                  </div>
                </div>


              </div>


              {/* ventes */}
              <div className="flex flex-col gap-5">
                {/* best seller */}
                <div className="mb-16">
                  <h1 ref={refPromotion} className="text-xl font-bold ">Promotion</h1>
                  <p className="text-base ">Découvrez les produits en promotion sur plateforme</p>
                  <div className="grid grid-cols-2 md:max-lg:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-5 mt-8">
                    {listPromotion}
                  </div>

                </div>

                {/* best seller */}
                <div className="mb-16 flex flex-col justify-between">
                  <div className="flex justify-between"> 
                    <h1 ref={refBestSeller} className="text-xl font-bold ">Les best sellers</h1> 

                    <div className="py-5">
                    {dataProduct['hydra:view']['hydra:next'] && <button className="text-base px-3 py-1 bg-jaune rounded text-black" onClick={() => {

                      setPageViewBestSeller(dataProduct['hydra:view']['hydra:next']);
                    }}>suivant</button>}
                    {dataProduct['hydra:view']['hydra:previous'] && <button className="text-base px-3 py-1 bg-jaune rounded text-black" onClick={() => {

                      setPageViewBestSeller(dataProduct['hydra:view']['hydra:previous']);
                    }}>precedant</button>}
                  </div>
                  </div>
                  <p className="text-base ">Les produits les plus vendus de la plateforme</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-5 mt-8">
                    {listDataProduct}
                  </div>

                  

                </div>

                {/* nouveau arrivage*/}
                <div className="mb-16">
                  <div className="flex justify-between">
                    <h1 ref={refArrivage} className="text-xl font-bold ">Nouveaux arrivages</h1>
                    <div className="py-5">

                      {dataProduct['hydra:view']['hydra:next'] && <button className="text-base px-3 py-1 bg-jaune rounded text-black" onClick={() => {

                        setPageViewNewArrivage(dataProduct['hydra:view']['hydra:next']);
                      }}>suivant</button>}
                      {dataProduct['hydra:view']['hydra:previous'] && <button className="text-base px-3 py-1 bg-jaune rounded text-black" onClick={() => {

                        setPageViewNewArrivage(dataProduct['hydra:view']['hydra:previous']);
                      }}>precedant</button>}
                    </div>
                  </div>
                  
                  <p className="text-base ">Les produits qui viennent d'arriver en stock</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-5 mt-8">
                    {listDataProduct}
                  </div>
                </div>

                {/* Offres flash */}
                <div>
                  <div className="flex items-center ">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/cd928a18ba4719d77b8ec78be1c34e2b971653629b989c20b07aa94bc22e3b02?"
                      className="aspect-square object-contain object-center w-[37px] overflow-hidden shrink-0 max-w-full my-auto" />
                    <h1 ref={refOffreFlash} className="text-xl font-bold ">Offres flash</h1>
                    <div className="ml-2 flex items-center">
                      <div className="text-base ">fins dans</div>
                      <div className="text-white text-base bg-rouge  ml-1 px-3 py-1 w-fit rounded-md">
                        <span className="text-white">08 Heures 05 minutes 30 secondes</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-base ">Les produits que nous devons liquider chap chap !</p>
                    {dataProduct['hydra:view']['hydra:next'] && <button className="text-base px-3 py-1 bg-jaune rounded text-black" onClick={() => {

                    setPageViewNewArrivage(dataProduct['hydra:view']['hydra:next']);
                    }}>suivant</button>}
                    {dataProduct['hydra:view']['hydra:previous'] && <button className="text-base px-3 py-1 bg-jaune rounded text-black" onClick={() => {

                    setPageViewNewArrivage(dataProduct['hydra:view']['hydra:previous']);
                    }}>precedant</button>}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-5 mt-8">
                    {listDataProduct}
                  </div>
                </div>

              </div>

            </div>

            {/* processus */}

            <div className="flex flex-col items-center md:flex-row md:justify-center mt-36">

              <motion.div whileHover={{ y: -20 }} className="flex w-[370px] px-8 md:mr-8 items-center flex-col">
                <div className="relative flex justify-center items-center rounded-[50%] border-solid border-4 border-jaune p-1 w-[170px] h-[170px] mb-3">
                  <img className="  w-[155px] h-[155px]"
                    loading="lazy"
                    srcSet={processus1}
                  ></img>

                  <div className="absolute flex justify-center items-center top-[-20px] rounded-[50%] w-[35px] h-[35px] border-2 border-jaune p-1 bg-white text-sm  text-center font-bold"><div>1</div></div>
                </div>

                <div className="font-bold  text-lg text-center">
                  Je passe ma commande
                </div>

                <div className=" text-base text-center">
                  Depuis mon ordinateur ou mon téléphone, je fini mon marché j’ajoute mon adresse de livraison et je valide mon panier
                </div>
              </motion.div>

              <motion.div whileHover={{ y: -20 }} className="flex w-[370px] px-8 my-8 md:my-0 md:mr-8 items-center flex-col">
                <div className="relative flex justify-center items-center rounded-[50%] border-solid border-4 border-jaune p-1 w-[170px] h-[170px] mb-3">
                  <img className=" w-[155px] h-[155px]"
                    loading="lazy"
                    srcSet={processus2}
                  ></img>

                  <div className="absolute flex justify-center items-center top-[-20px] rounded-[50%] w-[35px] h-[35px] border-2 border-jaune p-1 bg-white text-sm  text-center font-bold"><div>2</div></div>
                </div>

                <div className="font-bold  text-lg text-center">
                  Je réceptionne
                </div>

                <div className=" text-base text-center">
                  Depuis mon ordinateur ou mon téléphone,
                  je fini mon marché j’ajoute mon adresse de livraison et je valide mon panier
                </div>
              </motion.div>


              <motion.div whileHover={{ y: -20 }} className="flex w-[370px] px-8 items-center flex-col">
                <div className="relative flex justify-center items-center rounded-[50%] border-solid border-4 border-jaune p-1 w-[170px] h-[170px] mb-3">
                  <img className="w-[155px] h-[155px]"
                    loading="lazy"
                    srcSet={processus3}
                  ></img>

                  <div className="absolute flex justify-center items-center top-[-20px] rounded-[50%] w-[35px] h-[35px] border-2 border-jaune p-1 bg-white text-sm  text-center font-bold"><div>3</div></div>
                </div>

                <div className="font-bold  text-lg text-center">
                  Je consomme
                </div>

                <div className=" text-base text-center">
                  Faites vous plaisir avec votre produit
                  fraîchement reçu
                </div>
              </motion.div>

            </div>

            {/* fin-processus */}

            {/* témoignage */}
            <div className="flex flex-col mt-20">
              <h2 className="text-2xl mb-[50px] text-center font-bold ">Témoignage</h2>

              <div className="">
                <Temoignages></Temoignages>
              </div>
            </div>
            {/* fin-témoignage */}

          </div>



        </div>

      </motion.div>

    );
  }

  else {
    return <><div ref={refArrivage}></div> <div ref={refBestSeller}></div> <div ref={refOffreFlash}></div> <div ref={refPromotion}></div><LoadingSpinner></LoadingSpinner></>;
  }

}
