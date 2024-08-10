"use client";

import Alert from "@mui/material/Alert";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function page({ params }) {
  const logo = "/logo.png";
  const router = useRouter();

  const succes = (
    <><Alert variant="filled" className="w-[300px] " severity="success">paiement effectué avec succès</Alert>
    <Link href={"/"} className="text-base underline">retrouvez plus d'article</Link></>
  );
  const error = <><Alert variant="filled" className="w-[300px] " severity="error">le paiement a echoué</Alert><Link href={"/m/quisommesnous"} className="text-base underline">essayer de nous contacter</Link></>

  return (
    <div className="h-screen w-full gap-5 flex flex-col justify-center items-center">
      <img width={200} srcSet={logo} loading="lazy"></img>
      {params.code == 200 ? succes : error}
      
    </div>
  );
}
