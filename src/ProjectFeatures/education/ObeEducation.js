import { History, Target, Calendar } from "lucide-react";

function ObeEducation({ filteredData, age, lang }) {
  const items = Array.isArray(filteredData) ? filteredData : [];

  const visibleItems = items.filter((item) => {
    const cat = String(item.category || "").toLowerCase();
    return age >= 18 ? cat === "adult" : cat === "child";
  });

  // Parse content (English or Bangla)
  const parseContent = (content) => {
    if (!content) return [];
    return content
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(
      lang === "bn" ? "bn-BD" : "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
  };

  return (
    <div className="h-full p-4 flex items-center justify-center font-inter">
      <div className="w-full space-y-6">
        <div className="overflow-hidden">
          {/* Header */}
          <div className="py-6 border-b border-gray-200">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-800 font-poppins md:justify-start justify-center">
              <History className="h-6 w-6 text-primary" />
              {lang === "bn" ? "শিক্ষামূলক মডিউল" : "Educational Modules"}
            </h2>

            <p className="text-lg text-gray-500 mt-1 font-[poppins] md:text-left text-center">
              {lang === "bn"
                ? "স্থূলতা ও বিএমআই সম্পর্কিত শিক্ষা নিয়ে বিস্তারিত তথ্য"
                : "Comprehensive learning materials covering key aspects of obesity and BMI education"}
            </p>
          </div>

          {/* Content */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1 mx-auto my-12">
            {visibleItems?.map((module, index) => {
              const content = parseContent(
                lang === "bn" ? module.modinfo_bangla : module.modinfo
              );
              const isListContent = content.some((line) =>
                line.match(/^\d+\./)
              );
              const isEven = index % 2 === 0;

              return (
                <div
                  key={module.id}
                  className="border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3"></div>

                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {formatDate(module.created_at)}
                      </div>
                    </div>

                    {/* Module Title */}
                    <h2 className="text-2xl font-bold text-gray-700 flex items-center gap-2">
                      <Target className="w-6 h-6 text-primary" />
                      {(lang === "bn" ? module.topic_bangla : module.topic) +
                        " "}
                      {lang === "bn" ? "মডিউল" : "Focus Module"}
                    </h2>
                  </div>

                  <div
                    className={`flex flex-col lg:flex-row ${
                      isEven ? "" : "lg:flex-row-reverse"
                    } min-h-[400px]`}
                  >
                    {/* Image */}
                    <div className="lg:w-1/2 relative">
                      <div className="w-full h-[500px] p-8">
                        <img
                          src={module.mimage}
                          alt={module.id}
                          className="w-full h-full object-cover rounded-t-xl lg:rounded-l-xl"
                        />
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="lg:w-1/2 flex flex-col justify-center">
                      <div className="p-8 lg:p-12 space-y-6">
                        <div className="space-y-4">
                          {isListContent ? (
                            <div className="space-y-4">
                              <p className="text-xl font-semibold text-gray-700 font-[poppins]">
                                {content[0]}
                              </p>
                              <ul className="space-y-3">
                                {content.slice(1).map((item, idx) => (
                                  <li
                                    key={idx}
                                    className="text-gray-700 font-[poppins] flex items-start gap-3"
                                  >
                                    <span className="text-orange-500 font-bold text-lg">
                                      •
                                    </span>
                                    <span className="leading-relaxed">
                                      {item.replace(/^\d+\.\s*/, "")}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <p className="text-lg text-gray-700 font-[poppins] leading-relaxed">
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
    </div>
  );
}

export default ObeEducation;
