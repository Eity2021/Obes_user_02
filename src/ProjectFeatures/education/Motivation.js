import { History, Calendar, Target } from "lucide-react";

export default function Motivation({ age, filteredData, lang }) {
  const items = Array.isArray(filteredData) ? filteredData : [];

  // Filter adult/child based on age
  const visibleItems = items.filter((item) => {
    const cat = String(item.category || "").toLowerCase();
    return age >= 18 ? cat === "adult" : cat === "child";
  });

  // Localized date format
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

  // Parse multiline text
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
    <div className="h-full p-4 flex items-center justify-center font-inter">
      <div className="w-full space-y-6">
        <div>
          {/* Section Header */}
          <div className="py-6 border-b border-gray-200">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-700 md:justify-start justify-center">
              <History className="h-6 w-6 text-primary" />

              {lang === "bn"
                ? "স্বাস্থ্য ও সুস্থতার অনুপ্রেরণা"
                : "Health & Wellness Motivation"}
            </h2>

            <p className="text-lg text-gray-500 mt-1 md:text-left text-center">
              {lang === "bn"
                ? "আপনার সুস্থতা যাত্রার জন্য ব্যক্তিগত অনুপ্রেরণামূলক মডিউলগুলি আবিষ্কার করুন।"
                : "Discover personalized motivation modules designed to support your journey toward better health and wellness."}
            </p>
          </div>

          {/* Content */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1 mx-auto my-12">
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
                      <div></div>

                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {formatDate(module?.created_at)}
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-700 flex items-center gap-2">
                      <Target className="w-6 h-6 text-primary" />

                      {lang === "bn"
                        ? module.topic_bangla + " মডিউল"
                        : module.topic + " Focus Module"}
                    </h2>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-6">
                    <div
                      className={`flex flex-col lg:flex-row ${
                        isEven ? "" : "lg:flex-row-reverse"
                      } min-h-[400px]`}
                    >
                      {/* Image */}
                      {/* <div className="relative w-full h-[450px] rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={module?.mimage}
                          alt={`${module?.topic} motivation module`}
                          className="object-cover w-full h-full"
                        />
                      </div> */}
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
                                <p className="text-lg font-sans font-semibold text-gray-700">
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
                                      <span className="leading-relaxed">
                                        {item.replace(/^[0-9০-৯]+\.\s*/, "")}
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
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
