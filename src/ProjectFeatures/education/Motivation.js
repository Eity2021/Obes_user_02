import { History, Calendar, Target } from "lucide-react";

export default function Motivation({ age, filteredData }) {


  const items = Array.isArray(filteredData) ? filteredData : [];

  const visibleItems = items.filter(item => {
    const cat = String(item.category || '').toLowerCase();
    return age >= 18 ? cat === 'adult' : cat === 'child';
  });



  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };


  const parseContent = (content) => {
    if (!content) return [];
    return content.split("\n").map((line) => line.trim()).filter(Boolean);
  };

  return (
    <div className="h-full  p-4 flex items-center justify-center font-inter">
      <div className="w-full space-y-6">
        <div >
          {/* CardHeader Simulation */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800">
              <History className="h-6 w-6 text-primary" />
              Health & Wellness Motivation
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Discover personalized motivation modules designed to support your journey toward better health and wellness.
            </p>
          </div>
          {/* CardContent Simulation */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1 mx-auto my-12">
            {visibleItems?.map((module,index) => {
          const content = parseContent(module?.modinfo);
            const isListContent = content.some((line) => line.match(/^\d+\./));
            const isEven = index % 2 === 0;

return (
  
              <div
                key={module?.id}
                className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {formatDate(module?.created_at)}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Target className="w-6 h-6 text-primary" />
                    {module?.topic} Focus Module
                  </h2>
                </div>
                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* className="grid md:grid-cols-2 gap-6 items-center"  */}
                  <div  className={`flex flex-col lg:flex-row ${isEven ? "" : "lg:flex-row-reverse"} min-h-[400px]`}>
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={module?.mimage || "/placeholder.svg"}
                        alt={`${module?.topic} motivation module`}
                        className="object-cover w-full h-full"
                      />
                    </div>


                    {/* <div className="space-y-4 ">
                      <div className="bg-gray-100 p-4 rounded-lg ">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Motivation Focus:
                        </h3>
                        <div className="text-gray-700 leading-relaxed">
                          {formatModuleInfo(module.modinfo)}
                        </div>
                      </div>
                    </div> */}

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
                                    {item?.replace(/^\d+\.\s*/, "")}
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
              </div>
)
})}
          </div>
        </div>
      </div>
    </div>
  );
}
