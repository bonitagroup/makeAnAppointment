// src/components/AdminNavbar.js
import { Link, useLocation } from "react-router-dom";

export default function AdminNavbar() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-gray-900 text-white px-4 py-2 flex flex-wrap items-center gap-2 shadow mb-4 rounded-b-lg">
            <div className="flex gap-2 flex-1 min-w-0">
                <Link
                    to="/admin/departments"
                    className={`text-xs sm:text-sm font-medium px-3 py-1 rounded transition whitespace-nowrap ${isActive("/admin/departments") ? "bg-primary text-white" : "hover:bg-gray-700"}`}
                >
                    Quản lý Khoa
                </Link>
                <Link
                    to="/admin/doctors"
                    className={`text-xs sm:text-sm font-medium px-3 py-1 rounded transition whitespace-nowrap ${isActive("/admin/doctors") ? "bg-primary text-white" : "hover:bg-gray-700"}`}
                >
                    Quản lý Bác sĩ
                </Link>
                <Link
                    to="/admin/schedules"
                    className={`text-xs sm:text-sm font-medium px-3 py-1 rounded transition whitespace-nowrap ${isActive("/admin/schedules") ? "bg-primary text-white" : "hover:bg-gray-700"}`}
                >
                    Quản lý Lịch khám
                </Link>
            </div>
            <div className="flex-shrink-0 w-full sm:w-auto mt-2 sm:mt-0 sm:ml-auto">
                <Link
                    to="/"
                    className="block text-xs sm:text-sm font-medium px-3 py-1 rounded bg-gray-700 hover:bg-primary transition text-center"
                >
                    Về trang người dùng
                </Link>
            </div>
        </nav>
    );
}
