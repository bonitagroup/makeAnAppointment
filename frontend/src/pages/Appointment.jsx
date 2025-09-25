import { useEffect, useState } from "react";
import api from "../api/axios";
import { useLocation } from "react-router-dom";
import Loading from "../components/Loading";

export default function Appointment() {
    const [deps, setDeps] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [form, setForm] = useState({ departmentId: "", doctorId: "", date: "", time: "", symptoms: "" });
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(true);
    const [patientId, setPatientId] = useState(null);

    const loc = useLocation();
    useEffect(() => {
        // fetch deps & doctors
        Promise.all([api.get("/departments"), api.get("/doctors")]).then(([a, b]) => {
            setDeps(a.data || []);
            setDoctors(b.data || []);
        }).catch(() => { }).finally(() => setLoading(false));

        // Lấy patient_id từ user hiện tại
        api.get("/user/me").then(r => {
            const userId = r.data?.id;
            if (userId) {
                api.get(`/patients?user_id=${userId}`).then(res => {
                    if (res.data && res.data.length > 0) setPatientId(res.data[0].id);
                });
            }
        });

        // prefilling if query params
        const qp = new URLSearchParams(loc.search);
        const doctor = qp.get("doctor");
        const dept = qp.get("dept");
        setForm(prev => ({ ...prev, doctorId: doctor || prev.doctorId, departmentId: dept || prev.departmentId }));
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        setMsg("");
        try {
            await api.post("/appointments", {
                patient_id: patientId,
                doctor_id: form.doctorId,
                date: form.date,
                time: form.time,
                symptoms: form.symptoms,
                department_id: form.departmentId
            });
            setMsg("Đặt lịch thành công");
        } catch (err) {
            setMsg(err.response?.data?.message || "Lỗi đặt lịch");
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="container py-6 max-w-2xl">
            <div className="card">
                <h3 className="font-semibold mb-3">Đặt lịch khám</h3>
                {msg && <div className="text-sm text-green-600 mb-3">{msg}</div>}
                <form onSubmit={submit} className="space-y-3">
                    <select className="w-full p-3 border rounded" value={form.departmentId} onChange={(e) => setForm({ ...form, departmentId: e.target.value })}>
                        <option value="">Chọn khoa</option>
                        {deps.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>

                    <select className="w-full p-3 border rounded" value={form.doctorId} onChange={(e) => setForm({ ...form, doctorId: e.target.value })}>
                        <option value="">Chọn bác sĩ</option>
                        {doctors
                            .filter(doc => !form.departmentId || doc.department_id == form.departmentId || doc.departmentId == form.departmentId)
                            .map(d => <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>)}
                    </select>

                    <input type="date" className="w-full p-3 border rounded" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
                    <input type="time" className="w-full p-3 border rounded" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required />
                    <textarea className="w-full p-3 border rounded" placeholder="Triệu chứng (nếu có)" value={form.symptoms} onChange={(e) => setForm({ ...form, symptoms: e.target.value })} />
                    <button className="w-full py-3 bg-primary text-white rounded">Xác nhận đặt lịch</button>
                </form>
            </div>
        </div>
    );
}
