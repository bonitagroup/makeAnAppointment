import { useEffect, useState } from "react";
import api from "../api/axios";
import Loading from "../components/Loading";
import { useRecoilState } from "recoil";
import { departmentListAtom } from "@/atoms/departmentAtom";

export default function Departments() {
    const [deps, setDeps] = useRecoilState(departmentListAtom);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        if (deps.length === 0) {
            api.get("/departments").then(r => {
                setDeps(r.data);
            }).catch(() => { }).finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const showDoctors = async (dep) => {
        setSelected(dep);
        setDoctors([]);
        if (dep) {
            const res = await api.get("/doctors");
            setDoctors(res.data.filter(d => String(d.department_id) === String(dep.id)));
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="container py-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Danh sách khoa</h2>
            <div className="grid sm:grid-cols-2 gap-4">
                {deps.map(d => (
                    <div
                        key={d.id}
                        className={`card bg-gray-900 text-white cursor-pointer`}
                        onClick={() => showDoctors(d)}
                    >
                        <div>
                            <h4 className="font-semibold">{d.name}</h4>
                            <p className="text-sm text-gray-200">{d.description || "Không có mô tả"}</p>
                        </div>
                    </div>
                ))}
            </div>
            {selected && (
                <div className="mt-8 card bg-gray-900 text-white">
                    <h3 className="font-semibold mb-2">Bác sĩ của khoa {selected.name}</h3>
                    {doctors.length === 0 && <div>Chưa có bác sĩ nào.</div>}
                    <ul className="space-y-3">
                        {doctors.map(doc => (
                            <li key={doc.id} className="border-b border-gray-700 pb-3">
                                <div className="font-semibold">{doc.name} <span className="text-xs text-gray-300">({doc.specialty})</span></div>
                                <div className="text-sm text-gray-200">{doc.bio || "Chưa có giới thiệu."}</div>
                            </li>
                        ))}
                    </ul>
                    <button className="mt-4 px-4 py-2 bg-primary text-white rounded" onClick={() => setSelected(null)}>Quay lại danh sách khoa</button>
                </div>
            )}
        </div>
    );
}
