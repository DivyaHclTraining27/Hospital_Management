"use client"

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { customFetch } from "@/lib/api";
import { IHealth } from "@/interfaces/health";
import { useSession } from "next-auth/react";

export default function Dashboard() {
    const [healthMetrics, setHealthMetrics] = useState<IHealth[]>();
    const { data: session } = useSession() || {};
    console.log('session', session)
    const userId = session?.user as { id: string }

    useEffect(() => {
        const fetchHealthMetrics = async () => {
            console.log('userId', userId)
            try {
                const response = await customFetch<null, IHealth[]>({
                    path: `/api/health-matric/${userId?.id}`,
                    method: "GET"
                });
                if (response.success) {
                    setHealthMetrics(response?.data);
                    console.log('response.data', response.data)
                } else {
                    console.error("Failed to fetch health metrics:", response.message);
                }
            } catch (error: any) {
                console.error("Error fetching health metrics:", error.message);
            }
        };

        userId?.id && fetchHealthMetrics();
    }, [userId?.id]);
    console.log('healthMa', healthMetrics)
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-10">
                <h1 className="text-2xl font-bold">Welcome, Divya</h1>

                {/* Health Metrics Section */}
                <section className="mt-6">
                    <h2 className="text-xl font-semibold">Health Metrics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {healthMetrics ? (
                            <>
                                <div className="bg-white shadow p-5 rounded-lg">
                                    <h3 className="text-sm text-gray-500">Blood Sugar</h3>
                                    <div className="text-2xl font-semibold">{(healthMetrics?.[0] as unknown as { bloodSugar: string })?.bloodSugar} bpm</div>
                                </div>
                                <div className="bg-white shadow p-5 rounded-lg">
                                    <h3 className="text-sm text-gray-500">Blood Pressure</h3>
                                    <div className="text-2xl font-semibold">{(healthMetrics?.[0] as unknown as { bloodPressure: string })?.bloodPressure}°C</div>
                                </div>
                                <div className="bg-white shadow p-5 rounded-lg">
                                    <h3 className="text-sm text-gray-500">Weight</h3>
                                    <div className="text-2xl font-semibold">{(healthMetrics?.[0] as unknown as { weight: string })?.weight} mg/dL</div>
                                </div>
                            </>
                        ) : (
                            <p>Loading health metrics...</p>
                        )}
                    </div>
                </section>

                {/* Health Tip Section */}
                <section className="mt-6">
                    <h2 className="text-xl font-semibold">Health Tip of the Day</h2>
                    <p className="mt-2 text-gray-600">
                        Stay hydrated! Aim to drink at least 8 glasses of water per day.
                    </p>
                </section>
            </div>
        </div>
    );
}