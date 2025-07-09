
export default function ProgressItem({ label, value, current, total }) {
  return (
    <div>
    <div className="mb-1 flex items-center justify-between text-sm" style={{ fontFamily: "poppins" }}>
      <span className="font-medium" style={{ fontFamily: "poppins" }}>{label}</span>
      <span className="text-[14px]" style={{ fontFamily: "poppins" }}>{current} / {total}</span>
    </div>
    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200" style={{ fontFamily: "poppins" }}>
      <div
        className="h-full bg-green-500 transition-all duration-300 ease-in-out"
        style={{ width: `${value}%` ,fontFamily: "poppins"}}
      />
    </div>
  </div>
  )
}
