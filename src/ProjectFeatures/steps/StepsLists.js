import { CheckCircle, XCircle } from "lucide-react"
import { useGetStepsQuery } from "../../features/steps/stepsApi";
import { useGetProfileQuery } from "../../features/profile/profileApi";


const StatusCell = ({ value }) => {
    const isPositive = value === "Yes";
    return (
        <div className="flex justify-center items-center">
            {isPositive ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
                <XCircle className="w-4 h-4 text-red-600" />
            )}
        </div>
    );
};

export default function StepsLists() {

    const auth = JSON.parse(localStorage.getItem("auth"));
    const { data: profile } = useGetProfileQuery(auth?.role);
    const { data: stepsList } = useGetStepsQuery({ role: auth?.role, id: profile?.data?.id });

    const formatDate = (dateString) =>
        new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });


    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Tracking Data</h1>
                <p className="text-gray-600">7-Step Health Monitoring System</p>
                <div className="flex items-center gap-4 mt-4">
                    <span className="px-3 py-1 rounded-full border text-sm text-gray-700">
                        Total Entries: {stepsList?.data?.length}
                    </span>
                </div>
            </div>

            <div className="overflow-x-auto border rounded-lg">
                <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-2 font-semibold">ID</th>
                            <th className="px-4 py-2 font-semibold">Recorded Date</th>
                            <th className="px-4 py-2 font-semibold text-center">Exercise</th>
                            <th className="px-4 py-2 font-semibold text-center">Fruits & Veg</th>
                            <th className="px-4 py-2 font-semibold text-center">Meals</th>
                            <th className="px-4 py-2 font-semibold text-center">Screen Time</th>
                            <th className="px-4 py-2 font-semibold text-center">Sleep</th>
                            <th className="px-4 py-2 font-semibold text-center">Sugary Drinks</th>
                            <th className="px-4 py-2 font-semibold text-center">Treatment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stepsList?.data?.map((entry) => (
                            <tr key={entry.id} className="hover:bg-gray-50 border-t">
                                <td className="px-4 py-2 font-medium">{entry.id}</td>
                                <td className="px-4 py-2">{formatDate(entry.recorded_at)}</td>
                                <td className="px-4 py-2">
                                    <StatusCell value={entry.exercise} />
                                </td>
                                <td className="px-4 py-2">
                                    <StatusCell value={entry.fruitveg} />
                                </td>
                                <td className="px-4 py-2">
                                    <StatusCell value={entry.meals} />
                                </td>
                                <td className="px-4 py-2">
                                    <StatusCell value={entry.screentime} />
                                </td>
                                <td className="px-4 py-2">
                                    <StatusCell value={entry.sleep} />
                                </td>
                                <td className="px-4 py-2">
                                    <StatusCell value={entry.sugary_drinks} />
                                </td>
                                <td className="px-4 py-2">
                                    <StatusCell value={entry.treatment} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
