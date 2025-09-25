import { useEffect, useState } from "react";
import api from "@/api/axios";

export default function DoctorsAdmin() {
    const [list, setList] = useState([]);
    const [deps, setDeps] = useState([]);
    const [form, setForm] = useState({ name: "", title: "", bio: "", departmentId: "" });
    const [editing, setEditing] = useState(null);

    const load = async () => {
        const [dres, pres] = await Promise.all([api.get("/departments"), api.get("/doctors")]);
        setDeps(dres.data);
        setList(pres.data);
    };

    useEffect(() => { load(); }, []);

    const submit = async (e) => {
        e.preventDefault();
        if (!form.name) return alert("Nhập tên");
        if (editing) {
            await api.put(`/doctors/${editing.id}`, form);
            setEditing(null);
        } else {
            await api.post("/doctors", form);
        }
        setForm({ name: "", title: "", bio: "", departmentId: "" });
        load();
    };

    const edit = (d) => { setEditing(d); setForm({ name: d.name, title: d.title || "", bio: d.bio || "", departmentId: d.departmentId || "" }); };

    const remove = async (id) => { if (!confirm("Xóa bác sĩ?")) return; await api.delete(`/doctors/${id}`); load(); };

    return (
        <div className="p-4 max-w-4xl">
            <h2 className="text-xl font-bold mb-4">Quản lý Bác sĩ</h2>

            <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                <input placeholder="Tên bác sĩ" className="p-2 border rounded" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                <input placeholder="Chức danh (BS chuyên khoa...)" className="p-2 border rounded" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                <select value={form.departmentId} onChange={e => setForm({ ...form, departmentId: e.target.value })} className="p-2 border rounded">
                    <option value="">-- Chọn khoa --</option>
                    {deps.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
                <textarea placeholder="Tiểu sử" className="p-2 border rounded col-span-1 md:col-span-2" value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
                <div className="md:col-span-2 flex gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded">{editing ? "Cập nhật" : "Thêm"}</button>
                    {editing && <button type="button" onClick={() => { setEditing(null); setForm({ name: "", title: "", bio: "", departmentId: "" }); }} className="px-4 py-2 border rounded">Huỷ</button>}
                </div>
            </form>

            <ul className="space-y-2">
                {list.map(d => (
                    <li key={d.id} className="p-3 bg-white rounded shadow flex justify-between">
                        <div>
                            <div className="font-semibold">{d.name} <span className="text-sm text-gray-500">({d.title})</span></div>
                            <div className="text-sm text-gray-600">{d.department?.name}</div>
                            <div className="text-sm mt-1">{d.bio}</div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => edit(d)} className="px-3 py-1 border rounded">Sửa</button>
                            <button onClick={() => remove(d.id)} className="px-3 py-1 bg-red-500 text-white rounded">Xóa</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
