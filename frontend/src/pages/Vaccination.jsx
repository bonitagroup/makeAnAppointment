import { useEffect, useState } from "react";
import api from "../api/axios";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

export default function Vaccination() {
    const [vacs, setVacs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        api.get("/vaccines").then(r => setVacs(r.data || [])).catch(() => { }).finally(() => setLoading(false));
    }, []);

    const book = async (vaccineId) => {
        setMsg("");
        try {
            await api.post("/injections", { patient_id: 1, vaccine_id: vaccineId, date: new Date().toISOString().slice(0, 10), time: "09:00", dose_number: 1 });
            toast.success("Đặt lịch tiêm thành công");
        } catch (err) {
            toast.error(err.response?.data?.message || "Lỗi");
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="container py-6">
            <h3 className="text-xl font-semibold mb-4 text-white">Đặt lịch tiêm chủng</h3>
            <div className="grid sm:grid-cols-2 gap-4">
                {vacs.map(v => (
                    <div key={v.id} className="card flex flex-col">
                        <div className="font-semibold text-white">{v.name}</div>
                        <div className="text-sm text-white">Số mũi: {v.doses_required} • Khoảng cách: {v.interval_days} ngày</div>
                        <div className="mt-4">
                            <button onClick={() => book(v.id)} className="px-3 py-2 bg-primary text-white rounded">Đặt lịch</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
