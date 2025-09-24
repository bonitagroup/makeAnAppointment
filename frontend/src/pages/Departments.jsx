import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

export default function Departments() {
    const [deps, setDeps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/departments").then(r => {
            setDeps(r.data);
        }).catch(() => { }).finally(() => setLoading(false));
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="container py-6">
            <h2 className="text-xl font-semibold mb-4">Danh sách khoa</h2>
            <div className="grid sm:grid-cols-2 gap-4">
                {deps.map(d => (
                    <div key={d.id} className="card">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-semibold">{d.name}</h4>
                                <p className="text-sm text-gray-500">Xem bác sĩ trong khoa</p>
                            </div>
                            <Link to={`/doctor?dept=${d.id}`} className="text-primary">Xem</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
