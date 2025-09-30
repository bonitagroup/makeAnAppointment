import { useEffect, useState } from "react";
import api from "@/api/axios";
import dayjs from "dayjs";
import { useRecoilState } from "recoil";
import { departmentListAtom } from "@/atoms/departmentAtom";

export default function ApprovedSchedulesAdmin() {
    const [appointments, setAppointments] = useState([]);
    const [departments, setDepartments] = useRecoilState(departmentListAtom);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            setLoading(true);
            const [apRes, depRes] = await Promise.all([
                api.get("/appointments?status=approved"),
                api.get("/departments")
            ]);
            setAppointments(apRes.data || []);
            setDepartments(depRes.data || []);
            setLoading(false);
        }
        load();
    }, []);

    const grouped = {};
    appointments.forEach(a => {
        const depId = a.department_id || a.doctor?.department_id;
        if (!grouped[depId]) grouped[depId] = [];
        grouped[depId].push(a);
    });

    if (loading) return <div className="text-center py-8">Đang tải...</div>;

    return (
        <div className="container py-4 max-w-2xl">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Lịch đã duyệt theo khoa</h2>
            <div className="space-y-6">
                {departments.map(dep => (
                    <div key={dep.id}>
                        <div className="font-semibold text-lg mb-3 text-primary">{dep.name}</div>
                        {grouped[dep.id]?.length ? (
                            <div className="flex flex-col gap-3 ">
                                {grouped[dep.id].map(a => (
                                    <div key={a.id} className="card px-4 py-3 flex flex-col gap-1 shadow-sm border border-gray-200">
                                        <div className="font-semibold text-white text-base">{a.patient?.name || `Bệnh nhân #${a.patient_id}`}</div>
                                        <div className="text-sm text-white">
                                            <span className="font-medium">Bác sĩ:</span> {a.doctor?.name || `#${a.doctor_id}`}
                                        </div>
                                        <div className="text-sm text-white">
                                            <span className="font-medium">Ngày:</span> {dayjs(a.date).format("DD/MM/YYYY")}
                                            <span className="ml-2 font-medium">Giờ:</span> {a.time}
                                        </div>
                                        <div className="text-xs text-white">
                                            <span className="font-medium">Triệu chứng:</span> {a.symptoms || "-"}
                                        </div>
                                        <div className="text-xs text-green-600 font-semibold flex items-center gap-1 mt-1">
                                            <span>✔</span> Đã duyệt
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-gray-500 text-sm italic">Chưa có lịch đã duyệt.</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
