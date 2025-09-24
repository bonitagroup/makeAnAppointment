import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authAtom } from "@/atoms/authAtom";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const setAuth = useSetRecoilState(authAtom);
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        setLoading(true);
        try {
            const { data } = await api.post("/auth/login", form);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setAuth({ token: data.token, user: data.user, isAuthenticated: true });
            navigate("/");
        } catch (error) {
            setErr(error.response?.data?.message || "Đăng nhập thất bại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-8 max-w-md">
            <div className="card">
                <h2 className="text-xl font-semibold mb-4">Đăng nhập</h2>
                {err && <div className="text-red-600 mb-3">{err}</div>}
                <form onSubmit={submit} className="space-y-3">
                    <input className="w-full p-3 border rounded" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                    <input className="w-full p-3 border rounded" placeholder="Mật khẩu" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                    <button disabled={loading} className="w-full py-3 bg-primary text-white rounded">
                        {loading ? "Đang xử lý..." : "Đăng nhập"}
                    </button>
                </form>

                <div className="text-sm text-gray-500 mt-3">
                    Chưa có tài khoản? <Link to="/register" className="text-primary">Đăng ký</Link>
                </div>
            </div>
        </div>
    );
}
