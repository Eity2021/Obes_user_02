import React from 'react'

export default function HealthSummary({ submitted, setSubmitted, rating }) {
  return (
  <div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#7b1e19]" style={{fontFamily:'poppins'}}>
          {/* Award icon */}
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
              d="M12 6v6l4 2"
            />
          </svg>
          Health Summary
        </div>
        <p className="text-sm text-gray-500 mb-6" style={{fontFamily:'poppins'}}>
          Your health journey at a glance
        </p>

        {submitted ? (
          <div className="text-center space-y-4">
            <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="h-8 w-8 text-[#7b1e19]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-[#7b1e19]" style={{fontFamily:'poppins'}}>
              Thank You for Your Review!
            </h3>
            <p className="text-gray-600" style={{fontFamily:'poppins'}}>
              Your feedback helps us improve our healthcare services. We've
              recorded your rating of {rating}/5.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 border border-green-300 text-[#7b1e19] px-4 py-2 rounded hover:bg-green-50" style={{fontFamily:'poppins'}}
            >
              Submit Another Review
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-[rgba(123,30,25,0.1)] p-4 rounded-md">
                <h3 className="text-[#7b1e19] font-medium" style={{fontFamily:'poppins'}}>Health Score</h3>
                <div className="flex justify-between items-end mt-2">
                  <span className="text-3xl font-bold text-[#7b1e19]" style={{fontFamily:'poppins'}}>
                    82/100
                  </span>
                  <span className="text-sm text-[#7b1e19]" style={{fontFamily:'poppins'}}>
                    ↑ 4% from last month
                  </span>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="text-blue-800 font-medium" style={{fontFamily:'poppins'}}>Appointments</h3>
                <div className="flex justify-between items-end mt-2">
                  <span className="text-3xl font-bold text-blue-700" style={{fontFamily:'poppins'}}>3</span>
                  <span className="text-sm text-blue-600" style={{fontFamily:'poppins'}}>Next: April 28</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-gray-800 font-medium mb-2" style={{fontFamily:'poppins'}}>
                Recent Activity
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between border-b pb-2 border-gray-200">
                  <span className="text-gray-600" style={{fontFamily:'poppins'}}>Annual Physical</span>
                  <span className="text-gray-500" style={{fontFamily:'poppins'}}>2 weeks ago</span>
                </li>
                <li className="flex justify-between border-b pb-2 border-gray-200">
                  <span className="text-gray-600" style={{fontFamily:'poppins'}}>Dental Checkup</span>
                  <span className="text-gray-500" style={{fontFamily:'poppins'}}>1 month ago</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600" style={{fontFamily:'poppins'}}>Vaccination</span>
                  <span className="text-gray-500" style={{fontFamily:'poppins'}}>3 months ago</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
