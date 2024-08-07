"use server";

import { cookies } from "next/headers";
import { getUser } from "./getData";

export async function authentificate(formData) {
  let code = null;
  let responseParse = null;

  try {
    // on effectue la requete
    const response = await fetch("https://api.3dsupplychains.com/api/login", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include", // Pour envoyer les cookies lors de la requête
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "origin",
      body: JSON.stringify(formData),
    });

    //on parse la reponse
    responseParse = await response.json();

    // on recupère le code d'erreur s'il existe
    code = responseParse?.code;
  } catch (error) {
    console.error("Erreur lors de l'authentification :", error);
    // Gérer l'erreur ici, par exemple en affichant un message à l'utilisateur
  }

  // verifie le code d'erreur
  if (code === 401) {
    //s'il est existe on retourne une erreur
    return false;
  } else {
    //sinon on enregistre le cookies de session
    cookies().set({
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      secure: true,
      name: "session",
      value: responseParse?.token,
    });

    //on redirige l'utilisateur vers la page de compte
    return true;
  }
}

export async function deleteCookies() {
  try {
    cookies().delete("session");
    return "OK";
  } catch (error) {
    throw error;
  }
}

export async function getuser() {
  try {
    const user = await getUser();
    return true;
  } catch (error) {
    return false;
  }
}

export async function resetPassword(dataForm) {
  try {
    const response = await fetch(
      "https://api.3dsupplychains.com/api/users/set_new_password",
      {
        method: "POST",
        body: JSON.stringify(dataForm),
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    return true;
  } catch (e) {
    return e;
  }
}

export async function registerSendMail() {
  if (
    cookies().set({
      httpOnly: true,
      path: "/",
      secure: true,
      name: "emailVerificationSent",
      value: "true",
      sameSite: "none"
    })
  ) {
    return true;
  } else {
    return false;
  }
}
