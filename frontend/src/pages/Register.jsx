import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        try {
            await api.post("/auth/register", form);
            navigate("/login");
        } catch (e) {
            setErr(e.response?.data?.message || "Register failed");
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="bg-white p-6 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Đăng ký</h2>
                {err && <div className="text-red-600 mb-3">{err}</div>}
                <form onSubmit={submit} className="space-y-3">
                    <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Họ và tên"
                        className="w-full p-3 border rounded"
                        required
                    />
                    <input
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="Email"
                        className="w-full p-3 border rounded"
                        required
                    />
                    <input
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        placeholder="Mật khẩu"
                        type="password"
                        className="w-full p-3 border rounded"
                        required
                    />
                    <button className="w-full py-3 bg-primary text-white rounded">Đăng ký</button>
                </form>
            </div>
        </div>
    );
}
