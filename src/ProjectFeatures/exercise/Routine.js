import React from 'react'
import {Clock} from "lucide-react"

export default function Routine({ title, time, bgColor, textColor, description, items }) {
  return (
    <div className="border border-[#d1d1cf] rounded-xl shadow-sm">
    <div className="p-6 border-b border-[#d1d1cf]">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div
          className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${bgColor} ${textColor}`}
        >
          <Clock className="h-3 w-3" />
          <span>{time}</span>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
    <div className="p-6 grid gap-4 md:grid-cols-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600">
            {item.icon}
          </div>
          <div>
            <h3 className="font-medium">{item.title}</h3>
            <ul className="mt-1 list-disc list-inside text-sm text-gray-600 space-y-1">
              {item.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}
