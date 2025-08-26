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

  const auth = JSON.parse(localStorage.getItem("auth"));

  const { data: profile } = useGetProfileQuery(auth?.role);

  const dob = profile?.data?.dob;
  let age = null;

  if (dob) {
    const birthYear = new Date(dob).getFullYear();
    const currentYear = new Date().getFullYear();
    age = currentYear - birthYear;
  }

  const {
    data: educationList,
    isLoading,
    isError,
    error,
  } = useGetEduQuery(auth?.role);

  // console.log("educationList ", educationList)
  const iconMap = {
    Assessment: <Calculator className="w-4 h-4 mr-1" />,
    Education: <Clock className="w-4 h-4 mr-1" />,
    Motivation: <Hand className="w-4 h-4 mr-1" />,
    LifeModification: <PencilOff className="w-4 h-4 mr-1" />,
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
        <div className=" mt-4 w-full ">
          <div className="grid  grid-cols-4 tabs bg-base-200 rounded-[10px]">
            {tabs.map((tab) => (
              <a
                key={tab}
                className={`tab tab-bordered h-[50px] leading-[50px] text-[15px] 
          ${
            activeTab === tab
              ? "tab-active rounded-[4px] bg-primary text-[15px] font-medium text-white"
              : ""
          }`}
                onClick={() => setActiveTab(tab)}
              >
                {iconMap[tab] || null}
                {tab}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-4">
          {activeTab === "Assessment" && (
            <Assessment filteredData={filteredData} age={age} />
          )}
          {activeTab === "Education" && (
            <ObeEducation filteredData={filteredData} age={age} />
          )}
          {activeTab === "Motivation" && (
            <Motivation filteredData={filteredData} age={age} />
          )}
          {activeTab === "Life Style Modification" && (
            <LifeModification filteredData={filteredData} age={age} />
          )}
        </div>
      </TitleCard>
    </>
  );
}

export default Education;
