import { useEffect, useState } from "react";
import Motivation from "./Motivation";
import Assessment from "./Assessment";
import ObeEducation from "./ObeEducation";
import LifeModification from "./LifeModification";
import TitleCard from "../../components/Cards/TitleCard";
import { Calculator, Clock, PencilOff, Hand } from "lucide-react";
import { useGetEduQuery } from "../../features/education/educationApi";
import { useGetProfileQuery } from "../../features/profile/profileApi";

function Education() {
  const [activeTab, setActiveTab] = useState("Assessment");
  const [language, setLanguage] = useState("en");

  const auth = JSON.parse(localStorage.getItem("auth"));

  const { data: profile } = useGetProfileQuery(auth?.role);

  const dob = profile?.data?.dob;
  let age = null;

  if (dob) {
    const birthYear = new Date(dob).getFullYear();
    const currentYear = new Date().getFullYear();
    age = currentYear - birthYear;
  }

  const { data: educationList } = useGetEduQuery(auth?.role);

  const iconMap = {
    Assessment: <Calculator className="w-4 h-4 md:block hidden mr-1" />,
    Education: <Clock className="w-4 h-4 mr-1 md:block hidden" />,
    Motivation: <Hand className="w-4 h-4 mr-1 md:block hidden" />,
    "Life Style Modification": (
      <PencilOff className="w-4 h-4 mr-1 md:block hidden" />
    ),
  };

  const labelMap = {
    Assessment: { en: "Assessment", bn: "মূল্যায়ন" },
    Education: { en: "Education", bn: "শিক্ষা" },
    Motivation: { en: "Motivation", bn: "মোটিভেশন" },
    "Life Style Modification": {
      en: "Life Style Modification",
      bn: "জীবনধারা পরিবর্তন",
    },
  };

  const filteredData =
    educationList?.data?.filter((item) => item.modtype === activeTab) || [];

  const tabs = Array.from(
    new Set(educationList?.data?.map((item) => item.modtype))
  );

  useEffect(() => {
    if (tabs.length > 0 && !activeTab) {
      setActiveTab(tabs[0]);
    }
  }, [tabs, activeTab]);

  return (
    <>
      <TitleCard title="Obes School" topMargin="mt-2">
        <div className="flex justify-end mb-3">
          <button
            className="px-3 py-1 border rounded-md text-sm bg-base-200"
            onClick={() => setLanguage(language === "en" ? "bn" : "en")}
          >
            {language === "en" ? "বাংলা" : "English"}
          </button>
        </div>

        {/* TAB BUTTONS */}
        <div className="mt-4 w-[100%]">
          <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 tabs bg-base-200 rounded-[10px]">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`tab tab-bordered h-[50px] px-4 text-[16px] whitespace-nowrap font-roboto
                  ${
                    activeTab === tab
                      ? "tab-active rounded-[4px] bg-primary font-medium text-white font-roboto"
                      : ""
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {iconMap[tab] || null}
                {labelMap[tab]?.[language] || tab}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4">
          {activeTab === "Assessment" && (
            <Assessment filteredData={filteredData} age={age} lang={language} />
          )}
          {activeTab === "Education" && (
            <ObeEducation
              filteredData={filteredData}
              age={age}
              lang={language}
            />
          )}
          {activeTab === "Motivation" && (
            <Motivation filteredData={filteredData} age={age} lang={language} />
          )}
          {activeTab === "Life Style Modification" && (
            <LifeModification
              filteredData={filteredData}
              age={age}
              lang={language}
            />
          )}
        </div>
      </TitleCard>
    </>
  );
}

export default Education;
