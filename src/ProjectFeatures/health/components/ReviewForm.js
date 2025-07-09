import React from 'react'

export default function ReviewForm({ setRating, setSubmitted, rating }) {
      const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
 <div>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#7b1e19]">
          {/* Clipboard icon */}
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
              d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V7a2 2 0 012-2h1l1-2h6l1 2h1a2 2 0 012 2v11a2 2 0 01-2 2z"
            />
          </svg>
          Health Service Review
        </div>
        <p className="text-sm text-gray-500 mb-6" style={{fontFamily:'poppins'}}>
          Share your feedback about your recent health service
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="provider"
              style={{fontFamily:'poppins'}}
            >
              Healthcare Provider
            </label>
            <input
              id="provider"
              type="text"
              placeholder="Dr. Smith / City Hospital"
              className="w-full border border-[#7b1e19] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7b1e19]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="date" style={{fontFamily:'poppins'}}>
              Date of Service
            </label>
            <input
              id="date"
              type="date"
              className="w-full border border-[#7b1e19] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7b1e19]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{fontFamily:'poppins'}}>
              Overall Experience
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex flex-col items-center">
                  <input
                    type="radio"
                    name="rating"
                    id={`rating-${value}`}
                    value={value}
                    checked={rating === String(value)}
                    onChange={() => setRating(String(value))}
                    className="sr-only peer"
                  />
                  <label
                    htmlFor={`rating-${value}`}
                    className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-gray-300 peer-checked:border-[#7b1e19] peer-checked:bg-[rgba(123,30,25,0.3)]  text-sm"
                    style={{fontFamily:'poppins'}}
                  >
                    {value}
                  </label>
                  <span className="mt-1 text-xs text-gray-600">
                    {["Poor", "Fair", "Good", "Great", "Excellent"][value - 1]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="comments"
              className="block text-sm font-medium mb-1"
            >
              Additional Comments
            </label>
            <textarea
              id="comments"
              rows="4"
              placeholder="Share your experience and any suggestions for improvement..."
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7b1e19]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#7b1e19] text-white py-2 rounded hover:bg-[#7b1e19] transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  )
}
