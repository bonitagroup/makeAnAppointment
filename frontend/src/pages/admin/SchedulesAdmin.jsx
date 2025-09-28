import { useEffect, useState } from "react";
import api from "@/api/axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export default function SchedulesAdmin() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadAppointments = async () => {
        setLoading(true);
        try {
            const res = await api.get("/appointments");
            setAppointments(res.data);
        } catch {
            setAppointments([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadAppointments();
    }, []);

    const approve = async (id) => {
        try {
            await api.put(`/appointments/${id}/approve`);
            toast.success("Duyệt thành công, đã gửi thông báo cho bệnh nhân. Bệnh nhân cần đến đúng giờ.");
            loadAppointments();
        } catch (err) {
            toast.error(err.response?.data?.message || "Lỗi duyệt lịch.");
        }
    };

    const reject = async (id) => {
        try {
            await api.put(`/appointments/${id}/reject`);
            toast.success("Lịch đã bị từ chối.");
            loadAppointments();
        } catch (err) {
            toast.error(err.response?.data?.message || "Lỗi từ chối lịch.");
        }
    };

    return (
        <div className="p-4 max-w-4xl">
            <h2 className="text-xl font-bold mb-4">Quản lý Lịch hẹn bệnh nhân</h2>
            {loading ? (
                <div>Đang tải...</div>
            ) : (
                <div className="space-y-2">
                    {appointments.length === 0 && <div>Chưa có lịch hẹn nào.</div>}
                    {appointments.map(a => (
                        <div key={a.id} className="p-3 bg-white rounded shadow flex flex-col md:flex-row md:justify-between md:items-center">
                            <div>
                                <div className="font-semibold">{a.patient?.name || `Bệnh nhân #${a.patient_id}`}</div>
                                <div className="text-sm text-gray-600">
                                    Bác sĩ: {a.doctor?.name || `#${a.doctor_id}`} • Ngày: {dayjs(a.date).format("DD/MM/YYYY")} • Giờ: {a.time}
                                </div>
                                <div className="text-xs text-gray-500">SĐT: {a.phone || a.patient?.phone || "-"}</div>
                                <div className="text-xs text-gray-500">Triệu chứng: {a.symptoms || "-"}</div>
                                <div className="text-xs text-gray-500">
                                    Trạng thái: {a.status === "pending" ? "Chờ duyệt" : a.status === "approved" ? "Đã duyệt" : a.status}
                                    {a.status === "approved" && <span className="ml-2 text-green-600 font-semibold">✔ Đã duyệt!</span>}
                                </div>
                            </div>
                            <div className="flex gap-2 mt-2 md:mt-0">
                                {a.status === "pending" && (
                                    <>
                                        <button onClick={() => approve(a.id)} className="px-3 py-1 bg-green-600 rounded">Duyệt</button>
                                        <button onClick={() => reject(a.id)} className="px-3 py-1 bg-red-600 rounded">Không duyệt</button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}