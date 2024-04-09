'use client'

import { register } from 'swiper/element/bundle';

register()

function Temoignage() {
    const starImg = '/star.svg'
    const imgUser = '/User.png'
    return (
        <div className='flex flex-col items-center relative rounded-md shadow-[0_0px_40px_-20px_rgba(0,0,0,0.3)] pt-20 pb-8 mb-8 mt-[60px] mx-5' >
            <div className='text-base'>“lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem”</div>
            <div className='flex justify-between mt-2 mb-8'>
                <img className='w-[25px]' loading='lazy' srcSet={starImg}></img>
                <img className='w-[25px]' loading='lazy' srcSet={starImg}></img>
                <img className='w-[25px]' loading='lazy' srcSet={starImg}></img>
                <img className='w-[25px]' loading='lazy' srcSet={starImg}></img>
                <img className='w-[25px]' loading='lazy' srcSet={starImg}></img>
            </div>
            <div className='text-lg font-bold font-sans'>Yao Konan</div>
            <img loading='lazy' srcSet={imgUser} className='absolute rounded-full w-[100px] h-[100px] top-[-50px]'></img>
        </div>
    )
}


export default function Temoignages(){
    return(
        <>
        <div className='md:block hidden'>
            <swiper-container space-between="10" slides-per-view="3" navigation="true" speed="500" css-mode="true">
                <swiper-slide><Temoignage></Temoignage></swiper-slide>
                <swiper-slide><Temoignage></Temoignage></swiper-slide>
                <swiper-slide><Temoignage></Temoignage></swiper-slide>
                <swiper-slide><Temoignage></Temoignage></swiper-slide>
            </swiper-container>
        </div>
        <div className='md:hidden'>
                <swiper-container space-between="10" slides-per-view="1" navigation="true" speed="500" css-mode="true">
                    <swiper-slide><Temoignage></Temoignage></swiper-slide>
                    <swiper-slide><Temoignage></Temoignage></swiper-slide>
                    <swiper-slide><Temoignage></Temoignage></swiper-slide>
                    <swiper-slide><Temoignage></Temoignage></swiper-slide>
                </swiper-container>
            </div>
        </>
        
    )
} 