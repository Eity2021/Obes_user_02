import React from 'react'

export default function HealthMetrics() {
  return (
     <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#7b1e19]" style={{fontFamily:'poppins'}}>
        {/* Activity icon */}
        <svg
          className="h-5 w-5 text-[#7b1e19]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12h3m6 0h3m6 0h3"
          />
        </svg>
        Your Health Metrics
      </div>
      <p className="text-sm text-gray-500 mb-6" style={{fontFamily:'poppins'}}>
        Review your current health statistics and progress
      </p>

      {[
        { label: "Heart Rate", value: "72 BPM", progress: 72 },
        { label: "Blood Pressure", value: "120/80 mmHg", progress: 75 },
        { label: "Sleep Quality", value: "7.5 hours", progress: 85 },
        {
          label: "Physical Activity",
          value: "8,500 steps",
          progress: 65,
        },
      ].map((item) => (
        <div className="mb-6" key={item.label}>
          <div className="flex justify-between text-sm font-medium text-[#7b1e19] mb-1" style={{fontFamily:'poppins'}}>
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>
          <div className="w-full bg-[rgba(123,30,25,0.2)]  rounded-full h-2 overflow-hidden" style={{fontFamily:'poppins'}}>
            <div
              className="bg-[#7b1e19] h-2"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
