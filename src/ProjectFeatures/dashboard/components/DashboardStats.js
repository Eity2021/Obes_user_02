function DashboardStats({ profileData }) {
  const getGradient = () => {
    if (profileData?.bmi < 18.5) return "from-blue-500 to-blue-300"; // Underweight
    if (profileData?.bmi < 23) return "from-green-500 to-green-300"; // Normal
    if (profileData?.bmi < 30) return "from-yellow-500 to-orange-300"; // Overweight
    return "from-red-600 to-red-400"; // Obese
  };

  return (
    <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
      <div className="stats shadow">
        <div className="mx-auto w-full p-6 rounded-2xl shadow-lg text-white bg-gradient-to-r from-[#FFA659] to-[#f9d2b1]">
          <h1 className="text-[20px] font-bold font-[poppins] text-[#fff]">
            BMI
          </h1>
          <p className="text-xl font-semibold font-[poppins] text-[#fff]">
            {profileData?.bmi}
          </p>
        </div>
      </div>
      <div className="stats shadow">
        <div className={`stat  bg-gradient-to-r ${getGradient()}`}>
          <h1 className="text-[20px] font-bold font-[poppins] text-[#fff]">
            Category
          </h1>
          <p className="text-xl font-semibold font-[poppins] text-[#fff]">
            {profileData?.category}
          </p>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat bg-gradient-to-r from-[#d18c61] to-[#FFC38F]">
          <h1 className="text-[20px] font-bold font-[poppins]  text-[#fff]">
            Calorie
          </h1>
          <p className="text-xl font-semibold font-[poppins] text-[#fff]">
            {profileData?.calory}
          </p>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat bg-gradient-to-r from-[#A30831] to-[#f7bbca]">
          <h1 className="text-[20px] font-bold font-[poppins] text-[#fff]">
            Weight / Ideal Weight
          </h1>
          <p className="text-xl font-semibold font-[poppins] text-[#fff]">
            {profileData?.weight} Ibs
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;
