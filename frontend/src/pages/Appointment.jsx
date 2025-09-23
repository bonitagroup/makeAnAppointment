import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function Appointment() {
    const [departments, setDepartments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [form, setForm] = useState({ departmentId: "", doctorId: "", date: "", time: "", symptoms: "" });
    const [msg, setMsg] = useState("");

    useEffect(() => {
        api.get("/departments").then((r) => setDepartments(r.data)).catch(() => { });
        api.get("/doctors").then((r) => setDoctors(r.data)).catch(() => { });
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        setMsg("");
        try {
            // patient_id - for demo use 1, in real get from profile/patients
            await api.post("/appointments", { patient_id: 1, doctor_id: form.doctorId, date: form.date, time: form.time, symptoms: form.symptoms, department_id: form.departmentId });
            setMsg("Đặt lịch thành công");
        } catch (e) {
            setMsg(e.response?.data?.message || "Lỗi");
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Đặt lịch khám</h2>
                {msg && <div className="mb-3 text-sm">{msg}</div>}
                <form onSubmit={submit} className="space-y-3">
                    <select value={form.departmentId} onChange={(e) => setForm({ ...form, departmentId: e.target.value })} className="w-full p-3 border rounded">
                        <option value="">Chọn khoa</option>
                        {departments.map((d) => <option value={d.id} key={d.id}>{d.name}</option>)}
                    </select>

                    <select value={form.doctorId} onChange={(e) => setForm({ ...form, doctorId: e.target.value })} className="w-full p-3 border rounded">
                        <option value="">Chọn bác sĩ</option>
                        {doctors.map((d) => <option value={d.id} key={d.id}>{d.name} - {d.specialty}</option>)}
                    </select>

                    <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full p-3 border rounded" required />
                    <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="w-full p-3 border rounded" required />
                    <textarea value={form.symptoms} onChange={(e) => setForm({ ...form, symptoms: e.target.value })} placeholder="Triệu chứng (nếu có)" className="w-full p-3 border rounded" />
                    <button className="w-full py-3 bg-primary text-white rounded">Đặt lịch</button>
                </form>
            </div>
        </div>
    );
}
