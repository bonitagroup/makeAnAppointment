import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-3xl font-bold">Chào mừng đến với Mini Clinic</h1>
            <p className="text-gray-600">Đặt lịch khám, quản lý sổ tiêm và theo dõi sức khỏe dễ dàng.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link to="/appointment" className="p-4 bg-white rounded shadow hover:shadow-md">
                    <h3 className="font-semibold">Đặt lịch khám</h3>
                    <p className="text-sm text-gray-500">Chọn khoa, bác sĩ và khung giờ phù hợp.</p>
                </Link>
                <Link to="/profile" className="p-4 bg-white rounded shadow hover:shadow-md">
                    <h3 className="font-semibold">Hồ sơ cá nhân</h3>
                    <p className="text-sm text-gray-500">Quản lý bệnh án, người thân và lịch sử</p>
                </Link>
                <div className="p-4 bg-white rounded shadow hover:shadow-md">
                    <h3 className="font-semibold">Sổ tiêm</h3>
                    <p className="text-sm text-gray-500">Quản lý mũi tiêm và nhận nhắc lịch</p>
                </div>
            </div>
        </div>
    );
}
