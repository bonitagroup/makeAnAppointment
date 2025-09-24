import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="container py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-3">Mini Clinic — Đặt lịch khám đơn giản</h1>
                    <p className="text-gray-600 mb-6">Chọn khoa, bác sĩ, khung giờ; theo dõi sổ tiêm; nhận nhắc lịch.</p>
                    <div className="flex gap-3">
                        <Link to="/appointment" className="px-4 py-3 bg-primary text-white rounded-lg">Đặt lịch ngay</Link>
                        <Link to="/departments" className="px-4 py-3 border rounded-lg">Xem danh sách khoa</Link>
                    </div>
                </div>
                <div className="card">
                    <h3 className="font-semibold mb-2">Tính năng nổi bật</h3>
                    <ul className="space-y-2 text-gray-600">
                        <li>✅ Đặt lịch khám</li>
                        <li>✅ Đặt lịch tiêm chủng & sổ tiêm</li>
                        <li>✅ Nhắc lịch & quản lý người thân</li>
                        <li>✅ Đăng nhập bằng email / Zalo (sắp mở rộng)</li>
                    </ul>
                </div>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link className="card hover:shadow-md" to="/appointment">
                    <h4 className="font-semibold">Đặt lịch khám</h4>
                    <p className="text-sm text-gray-500">Chọn bác sĩ phù hợp và khung giờ rảnh.</p>
                </Link>
                <Link className="card hover:shadow-md" to="/vaccination">
                    <h4 className="font-semibold">Đặt lịch tiêm</h4>
                    <p className="text-sm text-gray-500">Quản lý sổ tiêm và nhắc mũi.</p>
                </Link>
                <Link className="card hover:shadow-md" to="/profile">
                    <h4 className="font-semibold">Hồ sơ cá nhân</h4>
                    <p className="text-sm text-gray-500">Quản lý thông tin và người thân.</p>
                </Link>
            </div>
        </div>
    );
}
