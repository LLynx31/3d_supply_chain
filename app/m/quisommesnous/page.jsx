'use client'

import { motion } from "framer-motion"

export default function PageQuiSommesNous(){

    const logo = "/logo.png"

    return(
        <motion.div initial={{opacity: 0, y:50}} animate={{opacity:1, y:0}} transition={{duration:0.3}} className="px-8 lg:px-20 mt-20">
            <div className="rounded-lg w-full h-[400px] bg-gray-200 flex justify-center items-center"><div className="font-bold text-lg">PHOTO DE L'EQUIPE</div></div>

            <div className="flex flex-col sm:flex-row justify-center md:gap-10 items-center ">
                <div className="w-full sm:w-1/2 mt-8">
                    <h1 className="text-lg font-bold mb-3">Qui sommes-nous ?</h1>
                    <p className="text-justify text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id pretium nibh. Suspendisse bibendum sed dolor in faucibus. Curabitur viverra est nisi, sit amet pellentesque ipsum consequat a. Aliquam porttitor, libero sed auctor commodo, purus leo volutpat ipsum, eu tristique tellus massa vitae urna. Fusce vitae porttitor risus. Nullam lobortis feugiat eros, a feugiat metus lacinia quis. Phasellus velit ipsum, mattis in purus sed, egestas condimentum sem. Quisque a est sit amet dui blandit iaculis nec rhoncus ipsum. Mauris ut pretium massa, posuere vehicula dui.</p> 
                </div>

                <div className="w-1/2 flex justify-center items-center">
                    <img loading="lazy" className="hidden sm:block w-[300px]" srcSet={logo}></img>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center mt-8 sm:gap-20">
                <div className="min-[1100px]:w-1/3 md:w-1/2 mt-8">
                    <h1 className="text-lg font-bold mb-3">Nous contacter</h1>
                    <div className="mb-5">
                        <input className="outline-0 text-base bg-slate-100 rounded-md py-2 px-2 w-full sm:w-[400px]"></input>
                    </div>
                    <div className="w-full">
                        <textarea className="outline-0 text-base bg-slate-100 rounded-md py-2 px-2 w-full sm:w-[400px]" rows="5" >
                            votre message
                        </textarea>
                    </div>
                    <button className="mt-6 text-base w-full sm:w-[400px] bg-jaune text-center py-2.5 rounded-md mb-2 ">Valider</button>
                </div>

                <div className="min-[1100px]:w-2/3 md:1/2 w-full  mt-16 flex justify-center items-center">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.8552746710984!2d-3.9634558261238433!3d5.285267536315043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ef5ea512a9f5%3A0xa9fd57d7eb0e72a!2sAgence%20Moses%20Art!5e0!3m2!1sfr!2sci!4v1709169364090!5m2!1sfr!2sci"  height="350" className="border-0 w-full" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </motion.div>
    )
}