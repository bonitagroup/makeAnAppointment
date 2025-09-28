import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        if (!form.name.trim() || /[0-9]/.test(form.name) || /[^a-zA-ZÀ-ỹ\s]/.test(form.name)) {
            toast.error("Tên không được chứa số hoặc ký tự đặc biệt và không được để trống.");
            return false;
        }
        if (!/^[\w.+-]+@gmail\.com$/.test(form.email)) {
            toast.error("Email phải là địa chỉ Gmail hợp lệ (kết thúc bằng @gmail.com).");
            return false;
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(form.password)) {
            toast.error("Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường và số.");
            return false;
        }
        return true;
    };

    const submit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            await api.post("/auth/register", form);
            toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Đăng ký lỗi");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-8 max-w-md">
            <div className="card">
                <h2 className="text-xl font-semibold mb-4 text-white">Tạo tài khoản</h2>
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
}
