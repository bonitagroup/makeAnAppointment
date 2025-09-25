import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authAtom } from "../atoms/authAtom";

export default function RequireAdmin({ children }) {
    const auth = useRecoilValue(authAtom);

    if (!auth.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (auth.user?.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
}
