import { Calendar, Target, History } from "lucide-react";

export default function LifeModification({ age, filteredData, lang }) {
  const items = Array.isArray(filteredData) ? filteredData : [];

  // const visibleItems = items.filter((item) => {
  //   const cat = String(item.category || "").toLowerCase();
  //   return age >= 18 ? cat === "adult" : cat === "child";
  // });
  const visibleItems = items.filter((item) => {
    const cat = String(item.category || "").toLowerCase();
    if (cat === "both") return true;
    return age >= 18 ? cat === "adult" : cat === "child";
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
    return content
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  };
  const isList = (content) => {
    if (content.length > 1) return true;
    return content.some((line) => /^[0-9০-৯]+\./.test(line));
  };

  return (
    <div className="h-full flex items-center justify-center font-inter">
      <div className="w-full space-y-6">
        <div>
          {/* Page Header */}
          <div className="py-6 border-b border-gray-200">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-700 md:justify-start justify-center font-roboto">
              <History className="h-6 w-6 text-primary" />

              {lang === "bn"
                ? "লাইফ স্টাইল মডিফিকেশন"
                : "Life Style Modification"}
            </h2>

            <p className="text-lg text-gray-500 mt-1 md:text-left text-center  font-roboto">
              {lang === "bn"
                ? "লাইফ স্টাইল মডিফিকেশন বলতে বোঝায় স্বাস্থ্যকর খাবার, নিয়মিত ব্যায়াম, ভালো ঘুম, স্ট্রেস নিয়ন্ত্রণ, ধূমপান এড়ানো এবং মনকে ইতিবাচক রাখা।"
                : "Life Style Modification includes healthy eating, regular exercise, good sleep, stress control, avoiding smoking, and positive habits for better health"}
            </p>
          </div>

          {/* Card Content */}
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1 mx-auto my-12">
            {visibleItems?.map((module, index) => {
              const selectedContent =
                lang === "bn" && module.modinfo_bangla
                  ? module.modinfo_bangla
                  : module.modinfo;

              const content = parseContent(selectedContent);

              const isListContent = isList(content);

              const isEven = index % 2 === 0;

              return (
                <div
                  key={module?.id}
                  className="border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div />
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {formatDate(module?.created_at)}
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-700 flex items-center gap-2  font-roboto">
                      <Target className="w-6 h-6 text-primary" />

                      {lang === "bn"
                        ? `${module?.topic_bangla} মডিউল`
                        : `${module?.topic} Focus Module`}
                    </h2>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-6">
                    <div
                      className={`flex justify-between flex-col lg:flex-row ${
                        isEven ? "" : "lg:flex-row-reverse"
                      } min-h-[400px]`}
                    >
                      <div className="lg:w-1/2 relative flex items-center">
                        <div className="p-8">
                          <img
                            src={module.mimage}
                            alt={module.id}
                            className="w-full h-full  rounded-xl lg:rounded-xl"
                          />
                        </div>
                      </div>

                      {/* Text */}
                      <div className="lg:w-1/2 flex flex-col justify-center">
                        <div className="p-8 lg:p-12 space-y-6">
                          <div className="space-y-4">
                            {isListContent ? (
                              <div className="space-y-4">
                                <p className="text-lg font-sans font-semibold text-gray-700  font-roboto">
                                  {content[0]}
                                </p>
                                <ul className="space-y-3">
                                  {content.slice(1).map((item, idx) => (
                                    <li
                                      key={idx}
                                      className="text-gray-700 font-sans flex items-start gap-3"
                                    >
                                      <span className="text-orange-500 font-bold text-lg">
                                        •
                                      </span>
                                      <span className="leading-relaxed  font-roboto text-[16px]">
                                        {item.replace(/^[0-9০-৯]+\.\s*/, "")}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : (
                              <p className="text-lg text-gray-700 font-sans leading-relaxed font-roboto text-[16px]">
                                {content[0]}
                              </p>
                            )}
                          </div>
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
