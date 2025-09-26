import { useEffect, useState } from "react";
import api from "../api/axios";
import dayjs from "dayjs";
import Loading from "../components/Loading";

export default function MyAppointments() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Lấy lịch đã đăng ký của user (demo: patient_id=1)
        api.get("/appointments/patient/1").then(r => setList(r.data || [])).catch(() => setList([])).finally(() => setLoading(false));
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="container py-6 max-w-2xl">
            <h3 className="font-semibold mb-4 text-white">Lịch khám của bạn</h3>
            {list.length === 0 && <div>Chưa có lịch khám nào.</div>}
            <div className="space-y-3">
                {list.map(a => (
                    <div key={a.id} className="card p-3">
                        <div className="font-semibold text-white">
                            Bác sĩ: {a.doctor?.name || `#${a.doctor_id}`}
                        </div>
                        <div className="text-sm text-white">
                            Ngày: {dayjs(a.date).format("DD/MM/YYYY")} • Giờ: {a.time}
                        </div>
                        <div className="text-xs text-white">Triệu chứng: {a.symptoms || "-"}</div>
                        <div className="text-xs text-white">
                            Trạng thái: {a.status === "pending" ? "Chờ duyệt" : a.status === "approved" ? "Đã duyệt" : a.status}
                            {a.status === "approved" && <span className="ml-2 text-green-600 font-semibold">✔ Đã duyệt! Vui lòng đến đúng giờ</span>}
                            {a.status === "cancelled" && <span className="ml-2 text-red-600 font-semibold">Đã hủy</span>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
