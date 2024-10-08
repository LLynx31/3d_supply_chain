import { getUser } from "./app/features/getData";
import { sendCodeVerifyMail } from "./app/features/postData";
import { cookies } from "next/headers";

export async function middleware(request) {
  

  const cookiesStore  =  cookies()

  let currentUser = null;

  // On essaie de récupérer l'utilisateur connecté
  try {
    currentUser = await getUser();
    //console.log(currentUser)
  } catch {
    currentUser = false;
  }

  const pathname = request.nextUrl.pathname;

  // Si l'utilisateur n'est pas connecté et se dirige vers dashboard
  if (pathname === "/") {
    return Response.redirect(new URL("/m/index", request.url));
  }

  // Redirections pour les utilisateurs non connectés
  const protectedPaths = ["/m/compte", "/paiement", "/m/panier", "/m/checkout"];
  if (
    !currentUser &&
    protectedPaths.some((path) => pathname.startsWith(path))
  ) {
    return Response.redirect(new URL("/connexion", request.url));
  }

  const protectedPaths_2 = [
    "/paiement",
    "/m/panier",
    "/m/checkout",
    "/m/article",
  ];
  // Si l'utilisateur est connecté mais n'a pas vérifié son email
  if (
    currentUser &&
    !currentUser["hydra:member"][0].emailVerified &&
    protectedPaths_2.some((path) => pathname.startsWith(path))
  ) {
    
    if(!cookiesStore.has('emailVerificationSent')){
      const response = await sendCodeVerifyMail(
        currentUser["hydra:member"][0].email
      );
      console.log("email sent")
      if (response === true) {
        return Response.redirect(new URL("/confirmeMail", request.url));
      }

      return Response.redirect(new URL("/404", request.url));
    }
    
    //console.log(response)
    return Response.redirect(new URL("/confirmeMail", request.url));
   
  }

  // Redirections pour les utilisateurs connectés
  const authPaths = ["/inscription", "/connexion", "/resetPassword"];
  if (currentUser && authPaths.some((path) => pathname.startsWith(path))) {
    return Response.redirect(new URL("/m/compte", request.url));
  }

  // Si l'utilisateur a vérifié son email et se dirige vers la confirmation d'email
  if (
    currentUser &&
    currentUser["hydra:member"][0].emailVerified &&
    pathname.startsWith("/confirmeMail")
  ) {
    return Response.redirect(new URL("/m/compte", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

