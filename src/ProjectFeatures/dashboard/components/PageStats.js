import HeartIcon  from '@heroicons/react/24/outline/HeartIcon'
import BoltIcon  from '@heroicons/react/24/outline/BoltIcon'


function PageStats({}){
    return(
        <div className="stats bg-base-100 shadow">
  
  <div className="stat">
    <div className="stat-figure invisible md:visible">
        <HeartIcon className='w-8 h-8'/>
    </div>
    <div className="stat-title">Healthy BMI Users</div>
    <div className="stat-value">4,800</div>
    <div className="stat-desc">12% increase from last month</div>
  </div>
  
  <div className="stat">
    <div className="stat-figure invisible md:visible">
        <BoltIcon className='w-8 h-8'/>
    </div>
    <div className="stat-title">Total BMI Records</div>
    <div className="stat-value">36</div>
    <div className="stat-desc">5% more entries this month</div>
  </div>
</div>
    )
}

export default PageStats