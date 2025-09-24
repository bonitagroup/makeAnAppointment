import { useRecoilValue } from "recoil";
import { authAtom } from "@/atoms/authAtom";

export default function Profile() {
    const auth = useRecoilValue(authAtom);
    const user = auth.user;

    return (
        <div className="container py-6 max-w-2xl">
            <div className="card">
                <h3 className="font-semibold mb-4">Hồ sơ</h3>
                {user ? (
                    <div className="space-y-2 text-gray-700">
                        <div><strong>Họ tên:</strong> {user.name}</div>
                        <div><strong>Email:</strong> {user.email}</div>
                        <div><strong>Số điện thoại:</strong> {user.phone || "-"}</div>
                    </div>
                ) : (
                    <div>Không có dữ liệu</div>
                )}
            </div>
        </div>
    );
}
