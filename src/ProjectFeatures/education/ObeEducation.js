function ObeEducation({ filteredData, age }) {
  console.log("filteredData", filteredData)
  console.log("Age:", age);

  const items = Array.isArray(filteredData) ? filteredData : [];

  const visibleItems = items.filter(item => {
    const cat = String(item.category || '').toLowerCase();
    return age >= 18 ? cat === 'adult' : cat === 'child';
  });

  console.log("visibleItems:", visibleItems);
  return (
    <>
      <div className="p-6 border-b border-gray-200">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
         Obesity Education Center
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Learn about obesity, its risks, and prevention strategies
        </p>
      </div>

    </>
  );
}

export default ObeEducation;
