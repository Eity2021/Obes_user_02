import TemplatePointers from "./components/TemplatePointers"
import logo from "../../images/logo.png"


function LandingIntro(){

    return(
        <div className="hero min-h-full rounded-l-xl bg-base-200">
            <div className="hero-content py-12">
              <div className="max-w-md">

              <div className='flex items-center  text-start font-bold '>
                <img src={logo} className="w-24 inline-block mr-2 mask mask-circle" alt="logo" />
                <h1 className="text-3xl font-bold uppercase font-[poppins]">Obesity Task Force</h1>
               
               </div>

                {/* <div className="text-center mt-12"><img src="./intro.png" alt="Dashwind Admin Template" className="w-48 inline-block"></img></div> */}
              
              {/* Importing pointers component */}
              <TemplatePointers />
              
              </div>

            </div>
          </div>
    )
      
  }
  
  export default LandingIntro