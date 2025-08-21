

function AmountStats({avgInfo}){
    return(
        <div className="grid lg:grid-cols-4 mt-10 grid-cols-1 gap-6">
        <div className="stats bg-base-100 shadow">
            <div className="stat bg-[#EF9795]">
                <div className="stat-title font-[poppins] font-normal text-[#fff]">Average BMI</div>
                <div className="stat-value font-[poppins] text-[#fff]">{avgInfo?.AvgBmi ? Number(avgInfo.AvgBmi).toFixed(2) : ""}</div>
                {/* <div className="stat-actions">
                    <button className="btn btn-xs">View Details</button> 
                </div> */}
            </div> 
        </div>
        <div className="stats bg-base-100 shadow">
            <div className="stat bg-[#B5ECD7]">
                <div className="stat-title font-[poppins] font-normal text-[#fff]">Average Calory</div>
                <div className="stat-value font-[poppins] font-bold text-[#fff]">{avgInfo?.AvgCalory ? Number(avgInfo.AvgCalory).toFixed(2) : ""}</div>            
            </div> 
        </div>
        <div className="stats bg-base-100 shadow">
            <div className="stat bg-[#AEACF4]">
                <div className="stat-title font-[poppins] font-normal text-[#fff]">Average Height</div>
                <div className="stat-value font-[poppins] font-bold text-[#fff]">{avgInfo?.AvgHeight ? Number(avgInfo.AvgHeight).toFixed(2) : ""}</div>
            </div> 
        </div>
        <div className="stats bg-base-100 shadow">
            <div className="stat bg-[#D2ECAD]">
                <div className="stat-title font-[poppins] font-normal text-[#fff]">Average Weight</div>
                <div className="stat-value font-[poppins] font-bold text-[#fff]">{avgInfo?.AvgWeight ? Number(avgInfo.AvgWeight).toFixed(2) : ""}</div>
            
            </div> 
        </div>
        </div>
    )
}

export default AmountStats