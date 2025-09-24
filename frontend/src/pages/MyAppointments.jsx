import { useEffect, useState } from "react";
import api from "../api/axios";
import Loading from "../components/Loading";

export default function MyAppointments() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // For demo we use patientId=1; ideally fetch from profile
        api.get("/appointments/patient/1").then(r => setList(r.data || [])).catch(() => { }).finally(() => setLoading(false));
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="container py-6">
            <h3 className="text-xl font-semibold mb-4">Lịch hẹn của tôi</h3>
            <div className="space-y-3">
                {list.length === 0 && <div className="text-gray-500">Bạn chưa có lịch hẹn.</div>}
                {list.map(a => (
                    <div key={a.id} className="card flex justify-between items-center">
                        <div>
                            <div className="font-semibold">Bác sĩ ID: {a.doctor_id}</div>
                            <div className="text-sm text-gray-500">Ngày: {a.date} • Giờ: {a.time}</div>
                        </div>
                        <div className="text-sm text-gray-600">Trạng thái: {a.status}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
