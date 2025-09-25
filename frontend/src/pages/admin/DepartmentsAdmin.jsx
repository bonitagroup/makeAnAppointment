import { useEffect, useState } from "react";
import api from "@/api/axios";

export default function DepartmentsAdmin() {
    const [list, setList] = useState([]);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [editing, setEditing] = useState(null);

    const load = async () => {
        const res = await api.get("/departments");
        setList(res.data);
    };

    useEffect(() => { load(); }, []);

    const submit = async (e) => {
        e.preventDefault();
        if (editing) {
            await api.put(`/departments/${editing.id}`, { name, description: desc });
            setEditing(null);
        } else {
            await api.post("/departments", { name, description: desc });
        }
        setName(""); setDesc("");
        load();
    };

    const edit = (d) => { setEditing(d); setName(d.name); setDesc(d.description || ""); };

    const remove = async (id) => { if (!confirm("Xóa khoa?")) return; await api.delete(`/departments/${id}`); load(); };

    return (
        <div className="p-4 max-w-3xl">
            <h2 className="text-xl font-bold mb-4">Quản lý Khoa</h2>
            <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-4">
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Tên khoa" className="w-full p-2 border rounded mb-2" required />
                <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Mô tả" className="w-full p-2 border rounded mb-2" />
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded">{editing ? "Cập nhật" : "Thêm"}</button>
                    {editing && <button type="button" onClick={() => { setEditing(null); setName(""); setDesc(""); }} className="px-4 py-2 border rounded">Huỷ</button>}
                </div>
            </form>

            <ul className="space-y-2">
                {list.map(d => (
                    <li key={d.id} className="p-3 bg-white rounded shadow flex justify-between items-start">
                        <div>
                            <div className="font-semibold">{d.name}</div>
                            <div className="text-sm text-gray-600">{d.description}</div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => edit(d)} className="px-3 py-1 border rounded text-sm">Sửa</button>
                            <button onClick={() => remove(d.id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Xóa</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
