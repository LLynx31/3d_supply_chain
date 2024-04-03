import{ NextRequest } from 'next/server'
import { getUser } from './app/features/getData'
 
export async function middleware(request) {

  
  let currentUser = null
  
  //on essaie recuperer l'utilisateur connecté
  try {
    currentUser =  await getUser()
    //console.log(currentUser )
  } 
  catch {
    currentUser =  false
  }
  


  //si l'utilisateur n'est pas connecté et se dirige vers dashbord
  if (!currentUser && request.nextUrl.pathname.startsWith('/m/compte')) {
    return Response.redirect(new URL('/inscription', request.url))
  }

  if (!currentUser && request.nextUrl.pathname.startsWith('/m/panier')) {
    return Response.redirect(new URL('/inscription', request.url))
  }

  //si l'utilisateur est connecté et se dirige vers inscription
  if (currentUser && request.nextUrl.pathname.startsWith('/inscription')) {
    return Response.redirect(new URL('/m/compte', request.url))
  }
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}