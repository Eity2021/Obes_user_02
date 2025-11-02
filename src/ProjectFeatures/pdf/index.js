import TitleCard from "../../components/Cards/TitleCard";
import { useGetPdfQuery } from "../../features/pdf/pdfApi";

export default function Pdf() {

  
    const auth = JSON.parse(localStorage.getItem("auth"));
    const {
      data: pdfData,
      isLoading,
      isError,
      error,
    } = useGetPdfQuery(auth?.role);

console.log("pdfdata", pdfData)
  return (
    <TitleCard title="List Of Pdf" topMargin="mt-2">
     <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pdfData?.data?.map((item) => (
                <div 
                    key={item.id} 
                    className="rounded-xl overflow-hidden shadow-lg bg-white transition-shadow duration-300 hover:shadow-xl border border-gray-100 flex flex-col"
                >
             
                    <a href={item.pdflink} target="_blank" rel="noopener noreferrer">
                        <img 
                            className="w-full h-48 object-cover" 
                            src={item.coverimage} 
                            alt={`${item.title} cover`}
                        />
                    </a>

                    <div className="p-6 flex flex-col flex-grow">
                   
                        <a href={item.pdflink} target="_blank" rel="noopener noreferrer">
                            <h2 className="font-medium text-lg mb-2 text-gray-800 hover:text-primary transition-colors duration-200">
                                {item.title}
                            </h2>
                        </a>
                        
                        <p className="text-gray-600 text-[14px] mb-4 line-clamp-3 flex-grow">
                            {item.short_summary}
                        </p>

                    
                        <div className="border-t border-gray-200 my-4"></div>

                   
                        <div className="flex justify-between items-center text-sm text-gray-500">
                  
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span className="font-medium text-gray-700">{item.upby}</span>
                            </div>
                            
                        
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                <span>{item.published_date}</span>
                            </div>
                        </div>

                   
                        <div className="mt-4">
                            <a href={item.pdflink} target="_blank" rel="noopener noreferrer" className="inline-block bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-smd text-sm transition-colors duration-200 w-full text-center">
                                Read Document
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </TitleCard>
  )
}
