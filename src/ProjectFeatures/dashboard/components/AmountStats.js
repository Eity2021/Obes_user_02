

function AmountStats({}){
    return(
        <div className="stats bg-base-100 shadow">
            <div className="stat">
                <div className="stat-title">Average BMI</div>
                <div className="stat-value">22.5</div>
                <div className="stat-actions">
                    <button className="btn btn-xs">View Details</button> 
                </div>
            </div>
            
            <div className="stat">
                <div className="stat-title">Users in Normal Range</div>
                <div className="stat-value">4,320</div>
                <div className="stat-actions">
                    <button className="btn btn-xs">View Users</button> 
                </div>
            </div>
        </div>
    )
}

export default AmountStats