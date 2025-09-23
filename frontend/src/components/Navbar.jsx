import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authAtom } from "../atoms/authAtom";

export default function Navbar() {
    const [auth, setAuth] = useRecoilState(authAtom);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAuth({ token: null, user: null });
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">Z</div>
                    <span className="font-semibold">Mini Clinic</span>
                </Link>

                <div className="flex items-center gap-4">
                    <Link to="/appointment" className="text-sm hover:underline">Đặt lịch</Link>
                    <Link to="/profile" className="text-sm hover:underline">Hồ sơ</Link>
                    {auth?.token ? (
                        <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">Đăng xuất</button>
                    ) : (
                        <Link to="/login" className="px-3 py-1 bg-primary text-white rounded">Đăng nhập</Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
