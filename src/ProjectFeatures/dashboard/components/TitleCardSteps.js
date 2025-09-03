import Subtitle from "../../../components/Typography/Subtitle";
import SubTitleSteps from "../../../components/Typography/SubTitleSteps";



  
  function TitleCardSteps({title, children, topMargin, TopSideButtons}){
      return(
          <div className={"card w-full p-6 bg-base-100 shadow-xl  font-[poppins] font-semibold " + (topMargin || "mt-6")}>

            {/* Title for Card */}
             <SubTitleSteps className="font-[poppins] font-semibold " styleClass={TopSideButtons ? "inline-block" : ""}>
                {title}

                {
                    TopSideButtons && <div className="inline-block float-right ">{TopSideButtons}</div>
                }
              </SubTitleSteps> 
              
              {/* <div className="divider mt-2"></div> */}
          
              {/** Card Body */}
              <div className='h-full w-full pb-6 bg-base-100'>
                  {children}
              </div>
          </div>
          
      )
  }
  
  
  export default TitleCardSteps;