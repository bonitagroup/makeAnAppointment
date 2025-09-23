import React from "react";
import { useRecoilValue } from "recoil";
import { authAtom } from "../atoms/authAtom";

export default function Profile() {
    const auth = useRecoilValue(authAtom);
    const user = auth.user;

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Hồ sơ cá nhân</h2>
                {user ? (
                    <div className="space-y-2">
                        <div><strong>Họ tên:</strong> {user.name}</div>
                        <div><strong>Email:</strong> {user.email}</div>
                    </div>
                ) : (
                    <div>Không có dữ liệu</div>
                )}
            </div>
        </div>
    );
}
