import React from "react";
import { useRecoilValue } from "recoil";
import { authAtom } from "../atoms/authAtom";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
    const auth = useRecoilValue(authAtom);
    if (!auth?.token) return <Navigate to="/login" replace />;
    return children;
}
