import { useEffect, useState } from "react";
import api from "../api/axios";
import { useLocation, Link } from "react-router-dom";
import Loading from "../components/Loading";

export default function DoctorDetail() {
    const loc = useLocation();
    const params = new URLSearchParams(loc.search);
    const id = params.get("id");
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }
        api.get(`/doctors/${id}`).then(r => setDoctor(r.data)).catch(() => { }).finally(() => setLoading(false));
    }, [id]);

    if (loading) return <Loading />;
    if (!doctor) return <div className="container py-6">Không tìm thấy bác sĩ.</div>;

    return (
        <div className="container py-6">
            <div className="card">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold">{doctor.name?.split(" ").slice(-1)}</div>
                    <div>
                        <h3 className="font-semibold">{doctor.name}</h3>
                        <div className="text-sm text-gray-500">{doctor.specialty}</div>
                        <div className="mt-3">{doctor.bio}</div>
                        <div className="mt-4">
                            <Link to={`/appointment?doctor=${doctor.id}`} className="px-4 py-2 bg-primary text-white rounded">Đặt lịch với bác sĩ</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
