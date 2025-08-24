function DashboardStats({profileData}){
  const getGradient = () => {
    if (profileData?.bmi < 18.5) return "from-blue-300 to-blue-500";   // Underweight
    if (profileData?.bmi < 23) return "from-green-300 to-green-500";   // Normal
    if (profileData?.bmi < 30) return "from-yellow-300 to-orange-400"; // Overweight
    return "from-red-400 to-red-600";                     // Obese
  };

    const getLabel = () => {
    if (profileData?.bmi < 18.5) return "Underweight";
    if (profileData?.bmi < 25) return "Healthy Weight";
    if (profileData?.bmi < 30) return "Overweight";
    return "Obese";
  };

  
    return(
        <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        <div className="stats shadow">
            <div  className={`mx-auto w-full p-6 rounded-2xl shadow-lg text-white bg-gradient-to-r ${getGradient()}`}>
                <h1 className="text-[20px] font-bold font-[poppins] text-[#fff]">BMI</h1>
                <p className="text-xl font-semibold font-[poppins] text-[#fff]">{profileData?.bmi} <span className="text-sm">({getLabel()})</span> </p>
                {/* <p className="text-lg font-semibold font-[poppins] text-[#fff]">{getLabel()}</p> */}
            </div>
      
        </div>
        <div className="stats shadow">
            <div className="stat bg-gradient-to-r from-[#FFC38F] to-[#A67A5E]">
                <h1 className="text-[20px] font-bold font-[poppins]  text-[#fff]">CALORY</h1>
                <p className="text-xl font-semibold font-[poppins] text-[#fff]">{profileData?.calory}</p>
            </div>
        </div>
        <div className="stats shadow">
            <div className="stat bg-gradient-to-r from-[#f9d2b1] to-[#FFA659] ">
                <h1 className="text-[20px] font-bold font-[poppins] text-[#fff]">HEIGHT</h1>
                <p className="text-xl font-semibold font-[poppins] text-[#fff]">{profileData?.hight}</p>
            </div>
        </div>
        <div className="stats shadow">
            <div className="stat bg-gradient-to-r from-[#f7bbca] to-[#A30831]">
                <h1 className="text-[20px] font-bold font-[poppins] text-[#fff]">WEIGHT</h1>
                <p className="text-xl font-semibold font-[poppins] text-[#fff]">{profileData?.weight}</p>
            </div>
        </div>
        </div>
    )
}

export default DashboardStats