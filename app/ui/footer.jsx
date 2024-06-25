import Link from "next/link"

export default function Footer() {
    
    const logo = "/logo.png"
    const downloadApple = "/download_apple.png"
    const downloadAndroid = "/download_android.png"
    const facebook = "/facebook.svg"
    const linkedin = "/linkedin.svg"
    const twitter = "/twitter.svg"
  return (
    <div className="bg-yellow-400 mt-36 p-5 max-md:px-5">
      <div className="gap-3 flex justify-between max-lg:flex-col max-md:items-stretch max-md:gap-0">

        <div className="flex flex-col items-stretch w-fit  max-md:ml-0">
          <div className="mt-8 max-md:max-w-full max-md:mt-10">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div className="flex flex-col items-stretch w-[57%] max-md:w-full max-md:ml-0">
                <div className="flex grow flex-col justify-center items-center mt-2.5 max-md:mt-10">
                  <img
                    loading="lazy"
                    srcSet= {logo}
                    className="aspect-[2.43] object-contain object-center w-[233px] overflow-hidden"
                  />
                  
                </div>
              </div>
              <div className="flex flex-col w-fit ml-5 max-md:w-full max-md:ml-0">
                <div className="flex flex-col items-between max-md:mt-10">
                  <div className="text-black text-lg font-bold">A propos</div>
                  <div className="text-black text-base whitespace-nowrap mt-4">
                    <Link target="_blank" href={"/mentions-legales.pdf"}>Mention légale</Link> 
                  </div>
                  <div className="text-black text-base whitespace-nowrap mt-4">
                    <Link target="_blank" href={"/Conditions_générales_de_vente.pdf"}>Conditions générales</Link>
                  </div>
                  <div className="text-black text-base mt-6"> <Link href={"FAQ"}>FAQ</Link> </div>
                  <div className="text-black text-base whitespace-nowrap mt-7">
                    <Link href={"quisommesnous"}>Qui sommes-nous ?</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-stretch w-fit  max-md:ml-0">
          <div className="flex grow items-stretch justify-between gap-5 mt-7 max-md:mt-10">
            <div className="bg-black w-px shrink-0 h-[263px]" />
            <div className="flex grow basis-[0%] flex-col items-stretch self-start">
              <div className="text-black text-lg font-bold">Contacts</div>
              <div className="flex justify-between gap-2 mt-5 items-start">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/0459a1766085384576accced4da0e6d1e8a5e9e88191f8dad13bb1d757e0fe77?"
                  className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                />
                <div className="text-black text-base grow shrink basis-auto">
                  Siège situé à Yopougon Niangon sud
                  <br />à gauche
                </div>
              </div>
              <div className="flex items-stretch justify-between gap-1.5 mt-8">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/bdacf7aab36bdd2fadefcf81ff3785b45ff225a5b9110afd3d861b525573ff2c?"
                  className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                />
                <div className="text-black text-base self-center grow shrink basis-auto my-auto">
                  (+225) 05 95 01 35 28
                </div>
              </div>
              <div className="flex items-stretch justify-between gap-1 mt-8">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/fcc3b8db244a754e224f661912baca53a1bfef69b0e75d13aa4ab20de03f565e?"
                  className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                />
                <div className="text-black text-base grow shrink basis-auto mt-1.5 self-start">
                  3dsupplychain@gmail.com
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col  max-md:ml-0">
          <div className="flex flex-col gap-5  my-auto max-md:mt-10">
            <div className="text-black text-lg font-bold whitespace-nowrap">
              Nos réseaux
            </div>
            <div className="flex justify-between w-[150px]">
              <div className="w-[43px] h-[43px]  flex justify-center items-center rounded-[100%] bg-white">
                          <img
                        loading="lazy"
                        srcSet={facebook}
                        className="aspect-square object-contain object-center  overflow-hidden shrink-0 max-w-full "
                          />
                      </div>

                      <div className="w-[43px] h-[43px] flex justify-center items-center rounded-[100%] bg-white">
                      <img
                        loading="lazy"
                        srcSet={linkedin}
                        className="aspect-square object-contain object-center  overflow-hidden shrink-0 max-w-full"
                      />
                      </div>
                      
                      <div className="w-[43px] h-[43px] flex justify-center items-center rounded-[100%] bg-white"><img
                        loading="lazy"
                        srcSet={twitter}
                        className="aspect-square object-contain object-center overflow-hidden shrink-0 max-w-full "
                      /></div>
            </div>
              
          </div>
        </div>
      </div>
    </div>
  );
}


