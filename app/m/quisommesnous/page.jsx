"use client";

import { motion } from "framer-motion";

export default function PageQuiSommesNous() {
  const logo = "/logo.png";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="px-8 lg:px-20 mt-20"
    >
      <div className="rounded-lg w-full bg-gray-200 flex justify-center items-center">
        <img className="rounded" src="/qui sommes nous 3D supply chain.jpg"></img>
      </div>

      <div className="flex flex-col sm:flex-row justify-center md:gap-10 items-center ">
        <div className="w-full sm:w-1/2 mt-8">
          <h1 className="text-lg font-bold mb-3">Qui sommes-nous ?</h1>
          <p className="text-justify text-base">
            Vous trouverez chez nous une équipe dynamique qui travaille dans le
            respect des engagements sociétaux pour mettre à votre disposition
            les meilleurs produits exotiques. Alors rejoignez-nous et ensemble
            nous irons loin.
          </p>
        </div>

        <div className="w-1/2 flex justify-center items-center">
          <img
            loading="lazy"
            className="hidden sm:block w-[300px]"
            srcSet={logo}
          ></img>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center mt-8 sm:gap-20">
        <div className="min-[1100px]:w-1/3 md:w-1/2 mt-8">
          <h1 className="text-lg font-bold mb-3">Nous contacter</h1>
          <div className="mb-5">
            <input className="outline-0 text-base bg-slate-100 rounded-md py-2 px-2 w-full sm:w-[400px]"></input>
          </div>
          <div className="w-full">
            <textarea
              className="outline-0 text-base bg-slate-100 rounded-md py-2 px-2 w-full sm:w-[400px]"
              rows="5" placeholder="Votre message"
            >
              
            </textarea>
          </div>
          <button className="mt-6 text-base w-full sm:w-[400px] bg-jaune text-center py-2.5 rounded-md mb-2 ">
            Valider
          </button>
        </div>

        <div className="min-[1100px]:w-2/3 md:1/2 w-full  mt-16 flex justify-center items-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2640.4499063501576!2d-3.1635833244793243!3d48.56293122145482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48118cd08aefb993%3A0xb83e02538ff9e237!2s3%20Rue%20Paul%20Serusier%2C%2022200%20Guingamp%2C%20France!5e0!3m2!1sfr!2sci!4v1723570135837!5m2!1sfr!2sci"
            height="350"
            className="border-0 w-full"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </motion.div>
  );
}
