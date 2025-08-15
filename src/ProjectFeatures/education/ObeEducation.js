import { GraduationCap, BookOpen, AlertTriangle, Heart } from "lucide-react";

function ObeEducation({ filteredData, age }) {
  console.log("filteredData", filteredData)
  console.log("Age:", age);

  const items = Array.isArray(filteredData) ? filteredData : [];

  const visibleItems = items.filter(item => {
    const cat = String(item.category || '').toLowerCase();
    return age >= 18 ? cat === 'adult' : cat === 'child';
  });

  console.log("visibleItems:", visibleItems);

    const parseContent = (content) => {
    if (!content) return [];
    return content.split("\n").map((line) => line.trim()).filter(Boolean);
  };

  return (
    <>

 <div className="min-h-screen bg-gradient-to-br from-[rgba(123,30,25,0.1)] to-orange-50 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="text-center space-y-2 mt-4">
          <h1 className="text-4xl font-poppins font-bold text-[#7B1E19]">
            Obesity Education Center
          </h1>
          <p className="text-[16px] text-gray-600 font-poppins">
            Learn about obesity, its risks, and prevention strategies
          </p>

        </div>

        {/* MODULE CARDS */}
        <div className="space-y-8">
          {visibleItems?.map((module, index) => {
            const content = parseContent(module.modinfo);
            const isListContent = content.some((line) => line.match(/^\d+\./));
            const isEven = index % 2 === 0;

            return (
              <div
                key={module.id}
                className="overflow-hidden shadow-xl border-0 bg-white hover:shadow-2xl transition-all duration-300"
              >
                <div
                  className={`flex flex-col lg:flex-row ${isEven ? "" : "lg:flex-row-reverse"} min-h-[400px]`}
                >
                  {/* IMAGE */}
                  <div className="lg:w-1/2 relative bg-gradient-to-br from-cyan-100 to-orange-100">
                    <img
                      src={module.mimage}
                      alt={module.id}
             
                      className="object-cover"
                
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      {/* <span className="inline-block bg-white/20 text-white border border-white/30 px-3 py-1 rounded-md text-sm">
                        {module.modnum}
                      </span> */}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="lg:w-1/2 flex flex-col justify-center">
                    <div className="p-8 lg:p-12 space-y-6">
                      <div className="space-y-4">
                        {/* <h3 className="text-3xl font-serif font-bold text-cyan-800">
                          {getModuleTitle(module.id)}
                        </h3> */}

                        {isListContent ? (
                          <div className="space-y-4">
                            <p className="text-lg font-sans font-semibold text-gray-900">
                              {content[0]}
                            </p>
                            <ul className="space-y-3">
                              {content.slice(1).map((item, idx) => (
                                <li key={idx} className="text-gray-700 font-sans flex items-start gap-3">
                                  <span className="text-orange-500 font-bold text-lg">•</span>
                                  <span className="leading-relaxed">
                                    {item.replace(/^\d+\.\s*/, "")}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <p className="text-lg text-gray-700 font-sans leading-relaxed">
                            {content[0]}
                          </p>
                        )}
                      </div>
                   
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
 
      </div>
    </div>
    </>
  );
}

export default ObeEducation;
