import { useState } from "react";

import TitleCard from "../../components/Cards/TitleCard";

import { Calculator, Clock, Info } from "lucide-react";
import BmiCalculator from "./BmiCalculator";
import BmiList from "./BmiList";
import BmiInfo from "./BmiInfo";
function Bmi() {
 const [activeTab, setActiveTab] = useState('calculator');
 
  return (
    <>
      <TitleCard title="BMI" topMargin="mt-2">
        <div className=" mt-4 w-full">
      <div className="grid  grid-cols-3 tabs bg-base-200 rounded-[10px]">
        <a
          className={`tab tab-bordered h-[50px] leading-[50px] text-[15px]${activeTab === 'calculator' ? 'tab-active rounded-[4px] bg-primary text-[15px] font-medium text-white' : ''}`}
          onClick={() => setActiveTab('calculator')}
        >
          <Calculator className="w-4 h-4 mr-1" /> Calculator
        </a>
        <a
          className={`tab tab-bordered h-[50px] leading-[50px] text-[15px] ${activeTab === 'history' ? 'tab-active rounded-[4px] bg-primary text-[15px] font-medium text-white' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <Clock className="w-4 h-4 mr-1" />History
        </a>
        <a
          className={`tab tab-bordered h-[50px] leading-[50px] text-[15px] ${activeTab === 'info' ? 'tab-active rounded-[4px] bg-primary text-[15px] font-medium text-white' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          <Info className="w-4 h-4 mr-1" /> Information
        </a>
      </div>
    </div>


    
      <div className="mt-4" >
        {activeTab === 'calculator' && <BmiCalculator />}
        {activeTab === 'history' && <BmiList />}
        {activeTab === 'info' && <BmiInfo />}
      </div>

      </TitleCard>
    </>
  );
}

export default Bmi;
