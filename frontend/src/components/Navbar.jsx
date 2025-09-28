import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { authAtom } from "@/atoms/authAtom";

export default function Navbar() {
    const [auth, setAuth] = useRecoilState(authAtom);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAuth({ token: null, user: null, isAuthenticated: false });
        navigate("/login");
    };

    if (location.pathname.startsWith("/admin")) return null;

    return (
        <header className="bg-white shadow-sm">
            <div className="container flex items-center justify-between py-2 px-3">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-sm">
                        Z
                    </div>
                    <div>
                        <div className="font-semibold text-sm sm:text-base">Mini Clinic</div>
                        <div className="hidden sm:block text-xs text-gray-500">
                            Đặt lịch khám & sổ tiêm
                        </div>
                    </div>
                </Link>

                <nav className="hidden md:flex items-center gap-4">
                    <Link to="/departments" className="text-sm text-gray-700 hover:text-primary">Khoa</Link>
                    <Link to="/appointment" className="text-sm text-gray-700 hover:text-primary">Đặt lịch</Link>
                    <Link to="/vaccination" className="text-sm text-gray-700 hover:text-primary">Tiêm chủng</Link>
                    {auth.isAuthenticated && (
                        <Link to="/profile" className="text-sm text-gray-700 hover:text-primary">Hồ sơ</Link>
                    )}
                    {auth.isAuthenticated && auth.user?.role === "admin" && (
                        <Link to="/admin" className="text-sm px-3 py-1.5 bg-gray-800 text-white rounded hover:bg-primary transition">Quản trị</Link>
                    )}
                    {auth.isAuthenticated ? (
                        <>
                            <Link to="/my-appointments" className="px-3 py-1.5 text-sm border rounded">
                                {auth.user?.name || "Bạn"}
                            </Link>
                            <button onClick={logout} className="px-3 py-1.5 bg-red-500 text-white rounded text-sm">
                                Đăng xuất
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="px-3 py-1.5 bg-primary text-white rounded text-sm">
                            Đăng nhập
                        </Link>
                    )}
                </nav>

                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>
            </div>

            {open && (
                <div className="md:hidden bg-white border-t shadow-sm flex flex-col gap-2 p-3">
                    <Link to="/departments" className="text-sm text-gray-700 hover:text-primary">Khoa</Link>
                    <Link to="/appointment" className="text-sm text-gray-700 hover:text-primary">Đặt lịch</Link>
                    <Link to="/vaccination" className="text-sm text-gray-700 hover:text-primary">Tiêm chủng</Link>
                    {auth.isAuthenticated && (
                        <Link to="/profile" className="text-sm text-gray-700 hover:text-primary">Hồ sơ</Link>
                    )}
                    {auth.isAuthenticated && auth.user?.role === "admin" && (
                        <Link to="/admin" className="text-sm px-3 py-1.5 bg-gray-800 text-white rounded hover:bg-primary transition">Quản trị</Link>
                    )}
                    {auth.isAuthenticated ? (
                        <>
                            <Link to="/my-appointments" className="px-3 py-1.5 text-sm border rounded">
                                {auth.user?.name || "Bạn"}
                            </Link>
                            <button onClick={logout} className="px-3 py-1.5 bg-red-500 text-white rounded text-sm">
                                Đăng xuất
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="px-3 py-1.5 bg-primary text-white rounded text-sm">
                            Đăng nhập
                        </Link>
                    )}
                </div>
            )}
        </header>
    );
}
