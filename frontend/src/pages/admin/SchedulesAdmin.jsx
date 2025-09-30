import { useEffect, useState } from "react";
import api from "@/api/axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export default function SchedulesAdmin() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);

    const loadAppointments = async () => {
        setLoading(true);
        try {
            const res = await api.get("/appointments");
            setAppointments(res.data);
        } catch (err) {
            setAppointments([]);
            console.error("Lỗi tải lịch hẹn:", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadAppointments();
    }, []);

    const approve = async (id) => {
        try {
            await api.put(`/appointments/${id}/approve`);
            toast.success("Duyệt thành công, đã gửi thông báo cho bệnh nhân.");
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
                        <div
                            key={a.id}
                            className="p-3 bg-white rounded shadow flex flex-col md:flex-row md:justify-between md:items-center cursor-pointer"
                            onClick={() => setSelected(a)}
                        >
                            <div>
                                <div className="font-semibold text-black">{a.patient?.name || `Bệnh nhân #${a.patient_id}`}</div>
                                <div className="text-sm text-black">
                                    Bác sĩ: {a.doctor?.name || `#${a.doctor_id}`} • Khoa: {a.doctor?.department?.name || a.department?.name || a.department_name || "-"} • Ngày: {dayjs(a.date).format("DD/MM/YYYY")} • Giờ: {a.time}
                                </div>
                                <div className="text-xs text-black">SĐT: {a.phone || a.patient?.phone || "-"}</div>
                                <div className="text-xs text-black">
                                    Giới tính: {
                                        a.patient?.gender === "M" ? "Nam" :
                                            a.patient?.gender === "F" ? "Nữ" :
                                                a.patient?.gender === "O" ? "Khác" :
                                                    a.patient?.user?.gender === "M" ? "Nam" :
                                                        a.patient?.user?.gender === "F" ? "Nữ" :
                                                            a.patient?.user?.gender === "O" ? "Khác" : "-"
                                    }
                                </div>
                                <div className="text-xs text-black">
                                    Email: {a.patient?.email || a.patient?.user?.email || "-"}
                                </div>
                                <div className="text-xs text-black">Triệu chứng: {a.symptoms || "-"}</div>
                                <div className="text-xs text-black">
                                    Trạng thái: {a.status === "pending" ? "Chờ duyệt" : a.status === "approved" ? "Đã duyệt" : a.status === "not_approved" ? "Không được duyệt" : a.status}
                                    {a.status === "approved" && <span className="ml-2 text-green-600 font-semibold">✔ Đã duyệt!</span>}
                                </div>
                            </div>
                            <div className="flex gap-2 mt-2 md:mt-0">
                                {a.status === "pending" && (
                                    <>
                                        <button onClick={e => { e.stopPropagation(); approve(a.id); }} className="px-3 py-1 bg-green-600 rounded text-white">Duyệt</button>
                                        <button onClick={e => { e.stopPropagation(); reject(a.id); }} className="px-3 py-1 bg-red-600 rounded text-white">Không duyệt</button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selected && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                            onClick={() => setSelected(null)}
                        >×</button>
                        <h3 className="text-lg font-bold mb-3">Chi tiết lịch hẹn</h3>
                        <div className="mb-2"><b>Bệnh nhân:</b> {selected.patient?.name || `Bệnh nhân #${selected.patient_id}`}</div>
                        <div className="mb-2">
                            <b>Giới tính:</b> {
                                selected.patient?.gender === "M" ? "Nam" :
                                    selected.patient?.gender === "F" ? "Nữ" :
                                        selected.patient?.gender === "O" ? "Khác" : "-"
                            }
                        </div>
                        <div className="mb-2"><b>SĐT:</b> {selected.phone || selected.patient?.phone || "-"}</div>
                        <div className="mb-2">
                            <b>Email:</b> {selected.patient?.user?.email || selected.patient?.email || "-"}
                        </div>
                        <div className="mb-2"><b>Bác sĩ:</b> {selected.doctor?.name || `#${selected.doctor_id}`}</div>
                        <div className="mb-2"><b>Khoa:</b> {selected.doctor?.department?.name || selected.department?.name || selected.department_name || "-"}</div>
                        <div className="mb-2"><b>Ngày khám:</b> {dayjs(selected.date).format("DD/MM/YYYY")}</div>
                        <div className="mb-2"><b>Giờ khám:</b> {selected.time}</div>
                        <div className="mb-2"><b>Triệu chứng:</b> {selected.symptoms || "-"}</div>
                        <div className="mb-2"><b>Trạng thái:</b> {selected.status === "pending" ? "Chờ duyệt" : selected.status === "approved" ? "Đã duyệt" : selected.status === "not_approved" ? "Không được duyệt" : selected.status}</div>
                    </div>
                </div>
            )}
        </div>
    );
}