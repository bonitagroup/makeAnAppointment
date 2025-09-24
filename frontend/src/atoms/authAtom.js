import { atom } from "recoil";

const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null;

export const authAtom = atom({
    key: "authAtom",
    default: {
        token,
        user,
        isAuthenticated: !!token
    }
});
