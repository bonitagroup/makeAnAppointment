import { useRecoilValue, useSetRecoilState } from "recoil";
import { authAtom } from "@/atoms/authAtom";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "@/api/axios";

export default function Profile() {
    const auth = useRecoilValue(authAtom);
    const setAuth = useSetRecoilState(authAtom);
    const user = auth.user;
    const [avatar, setAvatar] = useState(user?.avatar || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [gender, setGender] = useState(user?.gender || "O");
    const [loading, setLoading] = useState(false);

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("avatar", file);
            setLoading(true);
            try {
                const res = await api.post("/users/me/avatar", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                setAvatar(res.data.avatar);
                setAuth((prev) => ({
                    ...prev,
                    user: { ...prev.user, avatar: res.data.avatar }
                }));
                toast.success("Cập nhật ảnh đại diện thành công!");
            } catch (err) {
                toast.error(err.response?.data?.message || "Lỗi cập nhật ảnh đại diện.");
            }
            setLoading(false);
        }
    };

    const handleProfileUpdate = async () => {
        setLoading(true);
        try {
            const res = await api.put("/users/me", { phone, gender });
            const updatedUser = res.data.user || { ...user, phone: res.data.phone, gender: res.data.gender };
            setAuth((prev) => ({
                ...prev,
                user: updatedUser
            }));
            localStorage.setItem("user", JSON.stringify(updatedUser));
            toast.success("Cập nhật thông tin hồ sơ thành công!");
        } catch (err) {
            toast.error(err.response?.data?.message || "Lỗi cập nhật hồ sơ.");
        }
        setLoading(false);
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
                                <input type="file" accept="image/*" onChange={handleAvatarChange} disabled={loading} />
                            </div>
                        </div>
                        <div className="text-white"><strong>Họ tên:</strong> {user.name}</div>
                        <div className="text-white"><strong>Email:</strong> {user.email}</div>
                        <div className="text-white flex items-center">
                            <strong>Số điện thoại:</strong>
                            <input
                                className="ml-2 border rounded px-2 py-1"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                style={{ width: "140px" }}
                                disabled={loading}
                            />
                        </div>
                        <div className="text-white flex items-center">
                            <strong>Giới tính:</strong>
                            <select
                                className="ml-2 border rounded px-2 py-1 bg-gray-800 text-white"
                                value={gender}
                                onChange={e => setGender(e.target.value)}
                                style={{ width: "120px" }}
                                disabled={loading}
                            >
                                <option value="M">Nam</option>
                                <option value="F">Nữ</option>
                                <option value="O">Khác</option>
                            </select>
                        </div>
                        <button className="px-4 py-2 bg-primary text-white rounded" onClick={handleProfileUpdate} disabled={loading}>
                            {loading ? "Đang cập nhật..." : "Cập nhật"}
                        </button>
                    </div>
                ) : (
                    <div>Không có dữ liệu</div>
                )}
            </div>
        </div>
    );
}
