import { BookOpen } from "lucide-react";

export default function Assessment({ filteredData, age, lang }) {
  const items = Array.isArray(filteredData) ? filteredData : [];

  const visibleItems = items.filter((item) => {
    const cat = String(item.category || "").toLowerCase();
    return age >= 18 ? cat === "adult" : cat === "child";
  });

  return (
    <>
      <div className="py-6 border-b border-gray-200">
        <div className="py-6 border-b border-gray-200">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-800 font-poppins md:justify-start justify-center">
            <BookOpen className="h-6 w-6 text-primary" />
            {lang === "bn" ? "মূল্যায়ন মডিউল" : "Assessment Modules"}
          </h2>

          <p className="text-lg text-gray-500 mt-1 font-[poppins] md:text-left text-center">
            {lang === "bn"
              ? "স্থূলতা এবং BMI শিক্ষার মূল দিকগুলি কভার করে বিস্তৃত শিক্ষা উপকরণ"
              : "Comprehensive learning materials covering key aspects of obesity and BMI education"}
          </p>
        </div>
      </div>

      <div className="space-y-6 mt-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card bg-base-100 shadow-md">
            {lang == "bn" ? (
              <>
                <div className="card-body">
                  <h2 className="card-title">BMI বিভাগ</h2>
                  <p className="text-sm text-gray-500 mb-4">
                    BMI রেঞ্জ এবং তাদের অর্থ কী তা বোঝা
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50">
                      <span className="font-medium">কম ওজন</span>
                      <span className="text-blue-600">&lt; ১৮.৫</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-green-50">
                      <span className="font-medium">স্বাভাবিক ওজন</span>
                      <span className="text-green-600">১৮.৫ - ২২.৯</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-yellow-50">
                      <span className="font-medium">অতিরিক্ত ওজন</span>
                      <span className="text-yellow-600">২৩ - ২৪.৯</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-red-50">
                      <span className="font-medium">স্থূলতা</span>
                      <span className="text-red-600">২৫ &lt; ∞ </span>
                    </div>
                  </div>
                </div>{" "}
              </>
            ) : (
              <>
                {" "}
                <div className="card-body">
                  <h2 className="card-title">BMI Categories</h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Understanding BMI ranges and what they mean
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50">
                      <span className="font-medium">Underweight</span>
                      <span className="text-blue-600">&lt; 18.5</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-green-50">
                      <span className="font-medium">Normal weight</span>
                      <span className="text-green-600">18.5 - 22.9</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-yellow-50">
                      <span className="font-medium">Overweight</span>
                      <span className="text-yellow-600">23 - 24.9</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-red-50">
                      <span className="font-medium">Obesity</span>
                      <span className="text-red-600">25 - ∞</span>
                      <span className="">&ge; ∞</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Important Notes Card */}
          {lang == "bn" ? (
            <>
              {" "}
              <div>
                {visibleItems?.map((filter) => (
                  <div
                    key={filter.id}
                    className="card bg-base-100 shadow-md h-full"
                  >
                    <div className="card-body">
                      <h2 className="card-title text-[25px] ">
                        {filter?.topic_bangla}
                      </h2>
                      <span className="text-[18px] text-gray-700 font-poppins font-medium  mb-1 ">
                        {filter.modinfo_bangla
                          .split("\n")
                          .filter(Boolean)
                          .map((point, idx) => {
                            const cleanPoint = point
                              .replace(/^\d+\.\s*/, "")
                              .trim();
                            return (
                              <div key={idx}>
                                {idx + 1}. {cleanPoint}
                              </div>
                            );
                          })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {" "}
              <div>
                {visibleItems?.map((filter) => (
                  <div
                    key={filter.id}
                    className="card bg-base-100 shadow-md h-full"
                  >
                    <div className="card-body">
                      <h2 className="card-title text-[25px] ">
                        {filter?.topic}
                      </h2>
                      <span className="text-[18px] text-gray-700 font-poppins font-medium  mb-1 ">
                        {filter.modinfo
                          .split("\n")
                          .filter(Boolean)
                          .map((point, idx) => {
                            const cleanPoint = point
                              .replace(/^\d+\.\s*/, "")
                              .trim();
                            return (
                              <div key={idx}>
                                {idx + 1}. {cleanPoint}
                              </div>
                            );
                          })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
