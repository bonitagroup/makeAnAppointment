import { useEffect, useState } from "react";
import api from "../api/axios";
import { useLocation } from "react-router-dom";
import Loading from "../components/Loading";

export default function Appointment() {
    const [deps, setDeps] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [form, setForm] = useState({ departmentId: "", doctorId: "", date: "", time: "", symptoms: "" });
    const [msg, setMsg] = useState("");
    const [msgType, setMsgType] = useState("");
    const [loading, setLoading] = useState(true);
    const [patientId, setPatientId] = useState(null);
    const [phone, setPhone] = useState("");

    const loc = useLocation();

    useEffect(() => {
        Promise.all([api.get("/departments"), api.get("/doctors")])
            .then(([a, b]) => {
                setDeps(Array.isArray(a.data) ? a.data : []);
                setDoctors(Array.isArray(b.data) ? b.data : []);
            })
            .catch(() => { })
            .finally(() => setLoading(false));

        const user = JSON.parse(localStorage.getItem("user") || "null");
        if (!user || !user.id) {
            setPatientId(null);
            return;
        }

        api.get(`/patients?user_id=${user.id}`)
            .then(res => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    setPatientId(res.data[0].id);
                } else if (res.data && typeof res.data === "object" && res.data.id) {
                    setPatientId(res.data.id);
                } else {
                    api.post("/patients", {
                        user_id: user.id,
                        name: user.name,
                        phone: user.phone || "",
                        dob: "2000-01-01",
                        gender: "O",
                        relation: "self"
                    }).then(r => {
                        if (r.data && r.data.id) setPatientId(r.data.id);
                        else setPatientId(null);
                    }).catch(() => setPatientId(null));
                }
            })
            .catch(() => setPatientId(null));

        const qp = new URLSearchParams(loc.search);
        const doctor = qp.get("doctor");
        const dept = qp.get("dept");
        setForm(prev => ({
            ...prev,
            doctorId: doctor || prev.doctorId,
            departmentId: dept || prev.departmentId
        }));
    }, [loc.search]);

    const submit = async (e) => {
        e.preventDefault();
        setMsg("");
        setMsgType("");

        if (!patientId) {
            setMsg("Vui lòng đăng nhập lại hoặc kiểm tra tài khoản.");
            setMsgType("error");
            return;
        }
        if (!phone) {
            setMsg("Vui lòng nhập số điện thoại.");
            setMsgType("error");
            return;
        }
        if (!form.departmentId) {
            setMsg("Vui lòng chọn khoa.");
            setMsgType("error");
            return;
        }
        if (!form.doctorId) {
            setMsg("Vui lòng chọn bác sĩ.");
            setMsgType("error");
            return;
        }
        if (!form.date) {
            setMsg("Vui lòng chọn ngày khám.");
            setMsgType("error");
            return;
        }
        if (!form.time) {
            setMsg("Vui lòng chọn giờ khám.");
            setMsgType("error");
            return;
        }

        try {
            await api.post("/appointments", {
                patient_id: patientId,
                doctor_id: form.doctorId,
                date: form.date,
                time: form.time,
                symptoms: form.symptoms,
                department_id: form.departmentId,
                phone
            });
            setMsg("Đặt lịch thành công");
            setMsgType("success");
            setForm({ departmentId: "", doctorId: "", date: "", time: "", symptoms: "" });
            setPhone("");
        } catch (err) {
            setMsg(err.response?.data?.message || "Lỗi đặt lịch");
            setMsgType("error");
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="container py-6 max-w-2xl">
            <div className="card">
                <h3 className="font-semibold mb-3 text-white">Đặt lịch khám</h3>
                {msg && (
                    <div className={`text-sm mb-3 ${msgType === "success" ? "text-green-600" : "text-red-600"}`}>
                        {msg}
                    </div>
                )}
                <form onSubmit={submit} className="space-y-3">
                    <input
                        type="text"
                        className="w-full p-3 border rounded"
                        placeholder="Số điện thoại"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required
                    />
                    <select
                        className="w-full p-3 border rounded"
                        value={form.departmentId}
                        onChange={(e) => setForm({ ...form, departmentId: e.target.value })}
                    >
                        <option value="">Chọn khoa</option>
                        {deps.length > 0
                            ? deps.map(d => <option key={d.id} value={d.id}>{d.name}</option>)
                            : <option disabled>Không có khoa</option>}
                    </select>

                    <select
                        className="w-full p-3 border rounded"
                        value={form.doctorId}
                        onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
                    >
                        <option value="">Chọn bác sĩ</option>
                        {doctors.length > 0
                            ? doctors
                                .filter(doc => !form.departmentId || String(doc.department_id) === String(form.departmentId))
                                .map(d => <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>)
                            : <option disabled>Không có bác sĩ</option>}
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
