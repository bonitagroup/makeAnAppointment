import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        setLoading(true);
        try {
            await api.post("/auth/register", form);
            navigate("/login");
        } catch (error) {
            setErr(error.response?.data?.message || "Đăng ký lỗi");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-8 max-w-md">
            <div className="card">
                <h2 className="text-xl font-semibold mb-4">Tạo tài khoản</h2>
                {err && <div className="text-red-600 mb-3">{err}</div>}
                <form onSubmit={submit} className="space-y-3">
                    <input className="w-full p-3 border rounded" placeholder="Họ và tên" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                    <input className="w-full p-3 border rounded" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                    <input className="w-full p-3 border rounded" placeholder="Mật khẩu" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                    <button disabled={loading} className="w-full py-3 bg-primary text-white rounded">Đăng ký</button>
                </form>
            </div>
        </div>
    );
}
