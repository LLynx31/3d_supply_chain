'use client'

import { motion } from "framer-motion"

export default function PageFAQ(){
    return(
        <motion.div initial={{opacity: 0, y:50}} animate={{opacity:1, y:0}} transition={{duration:0.3}} className="mt-16 px-24">
            <h1 className="font-bold text-[50px] tracking-[0.10em] text-center">FAQ</h1>
            <p className="text-center text-base tracking-[0.05em] mb-8">Vos questions frequemment posées</p>
            <div className="grid sm:grid-cols-2 gap-10">
                <div className="px-3 py-3 flex justify-between items-center bg-slate-100">
                    <div className="text-base">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
                    <div className="text-[18px]">+</div>
                </div>

                <div className="px-3 py-3 flex justify-between items-center bg-slate-100">
                    <div className="text-base">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
                    <div className="text-[18px]">+</div>
                </div>

                <div className="px-3 py-3 flex justify-between items-center bg-slate-100">
                    <div className="text-base">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
                    <div className="text-[18px]">+</div>
                </div>

                <div className="px-3 py-3 flex justify-between items-center bg-slate-100">
                    <div className="text-base">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
                    <div className="text-[18px]">+</div>
                </div>

                <div className="px-3 py-3 flex justify-between items-center bg-slate-100">
                    <div className="text-base">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
                    <div className="text-[18px]">+</div>
                </div>

                <div className="px-3 py-3 flex justify-between items-center bg-slate-100">
                    <div className="text-base">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
                    <div className="text-[18px]">+</div>
                </div>

                <div className="px-3 py-3 flex justify-between items-center bg-slate-100">
                    <div className="text-base">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
                    <div className="text-[18px]">+</div>
                </div>

                <div className="px-3 py-3 flex justify-between items-center bg-slate-100">
                    <div className="text-base">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
                    <div className="text-[18px]">+</div>
                </div>
            </div>
        </motion.div>
    )
}