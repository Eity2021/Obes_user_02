export default function TipItem({ icon, iconBg, title, desc }) {
  return (
    <div className="flex items-start gap-3" style={{ fontFamily: "poppins" }}>
    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${iconBg}`} style={{ fontFamily: "poppins" }}>
      {icon}
    </div>
    <div>
      <h3 className="text-sm font-medium" style={{ fontFamily: "poppins" }}>{title}</h3>
      <p className="mt-1 text-xs text-gray-500" style={{ fontFamily: "poppins" }}>{desc}</p>
    </div>
  </div>
  )
}
