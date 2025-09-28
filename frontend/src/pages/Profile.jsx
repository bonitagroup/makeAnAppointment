import { useRecoilValue } from "recoil";
import { authAtom } from "@/atoms/authAtom";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Profile() {
    const auth = useRecoilValue(authAtom);
    const user = auth.user;
    const [avatar, setAvatar] = useState(user?.avatar || "");
    const [phone, setPhone] = useState(user?.phone || "");

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAvatar(url);
            toast.info("Ảnh đại diện đã được cập nhật (chỉ hiển thị demo, chưa lưu lên server)");
        }
    };

    const handlePhoneUpdate = () => {
        toast.success("Số điện thoại đã được cập nhật (chỉ hiển thị demo, chưa lưu lên server)");
    };

    return (
        <div className="container py-6 max-w-2xl">
            <div className="card">
                <h3 className="font-semibold mb-4 text-white">Hồ sơ</h3>
                {user ? (
                    <div className="space-y-4 text-white">
                        <div className="flex items-center gap-4">
                            <img
                                src={avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name)}
                                alt="avatar"
                                className="w-16 h-16 rounded-full border"
                            />
                            <div>
                                <input type="file" accept="image/*" onChange={handleAvatarChange} />
                            </div>
                        </div>
                        <div className="text-white"><strong>Họ tên:</strong> {user.name}</div>
                        <div className="text-white"><strong>Email:</strong> {user.email}</div>
                        <div className="text-white">
                            <strong>Số điện thoại:</strong>
                            <input
                                className="ml-2 border rounded px-2 py-1"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                style={{ width: "140px" }}
                            />
                            <button className="ml-2 px-3 py-1 bg-primary text-white rounded" onClick={handlePhoneUpdate}>Cập nhật</button>
                        </div>
                    </div>
                ) : (
                    <div>Không có dữ liệu</div>
                )}
            </div>
        </div>
    );
}
