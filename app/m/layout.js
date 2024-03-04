import Footer from "../ui/footer";
import Header from "../ui/header";

export default function LayoutM({children}){
    return(

       <div>

            <Header></Header>
      

            <div className="">
            {children}
            </div>

            <Footer></Footer>

       </div> 
        

    )
}