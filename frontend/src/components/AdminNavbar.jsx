import { Link, useLocation, useNavigate } from "react-router-dom";

export default function AdminNavbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-gray-900 text-white px-2 py-2 flex flex-col gap-2 shadow mb-4 rounded-b-lg">
            <div className="flex items-center mb-2">
                <button
                    onClick={() => navigate("/")}
                    className="mr-2 text-white text-xl px-2 py-1 rounded hover:bg-gray-700 flex-shrink-0"
                    aria-label="Về trang người dùng"
                >
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <span className="font-bold text-base sm:text-lg md:text-xl truncate max-w-[70vw] overflow-hidden whitespace-nowrap">Quản trị</span>
            </div>
            <div className="flex flex-row flex-wrap gap-1 flex-1 min-w-0 mt-2">
                <Link
                    to="/admin/approved-schedules"
                    className={`font-medium px-2 py-1 rounded transition whitespace-nowrap
                        text-sm lg:text-base
                        ${isActive("/admin/approved-schedules") ? "bg-primary text-white" : "hover:bg-gray-700"}`}
                >
                    Lịch đã duyệt
                </Link>
                <Link
                    to="/admin/departments"
                    className={`font-medium px-2 py-1 rounded transition whitespace-nowrap
                        text-sm lg:text-base
                        ${isActive("/admin/departments") ? "bg-primary text-white" : "hover:bg-gray-700"}`}
                >
                    Quản lý Khoa
                </Link>
                <Link
                    to="/admin/doctors"
                    className={`font-medium px-2 py-1 rounded transition whitespace-nowrap
                        text-sm lg:text-base
                        ${isActive("/admin/doctors") ? "bg-primary text-white" : "hover:bg-gray-700"}`}
                >
                    Bác sĩ
                </Link>
                <Link
                    to="/admin/schedules"
                    className={`font-medium px-2 py-1 rounded transition whitespace-nowrap
                        text-sm lg:text-base
                        ${isActive("/admin/schedules") ? "bg-primary text-white" : "hover:bg-gray-700"}`}
                >
                    Lịch khám
                </Link>
            </div>
        </nav>
    );
}
