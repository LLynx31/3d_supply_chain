
import { cookies } from "next/headers";
import Footer from "../ui/footer";
import Header from "../ui/header";
import BottomMenu from "../ui/bottomMenu";

export default function LayoutM({children}){


    const isLogin = cookies().has('session')
    console.log('yes')
    return(

       <div>

            <Header></Header>
      

                <div className="">
                {children}
                </div>

            <Footer></Footer>
            <BottomMenu></BottomMenu>
            
       </div> 
        

    )
}