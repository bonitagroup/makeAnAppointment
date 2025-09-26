import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Departments from "./pages/Departments";
import DoctorDetail from "./pages/DoctorDetail";
import Appointment from "./pages/Appointment";
import MyAppointments from "./pages/MyAppointments";
import Profile from "./pages/Profile";
import Vaccination from "./pages/Vaccination";
import RequireAuth from "./components/RequireAuth";

// Admin imports
import RequireAdmin from "./components/RequireAdmin";
import DepartmentsAdmin from "./pages/admin/DepartmentsAdmin";
import DoctorsAdmin from "./pages/admin/DoctorsAdmin";
import SchedulesAdmin from "./pages/admin/SchedulesAdmin";
import ApprovedSchedulesAdmin from "./pages/admin/ApprovedSchedulesAdmin";
import AdminNavbar from "./components/AdminNavbar";

export default function App() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar chỉ hiện cho client, admin có navbar riêng */}
            <Navbar />
            <main className="flex-grow">
                <Routes>
                    {/* Client routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/departments" element={<Departments />} />
                    <Route path="/doctor" element={<DoctorDetail />} />
                    <Route
                        path="/appointment"
                        element={
                            <RequireAuth>
                                <Appointment />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/my-appointments"
                        element={
                            <RequireAuth>
                                <MyAppointments />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <RequireAuth>
                                <Profile />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/vaccination"
                        element={
                            <RequireAuth>
                                <Vaccination />
                            </RequireAuth>
                        }
                    />

                    {/* Admin routes */}
                    <Route
                        path="/admin"
                        element={
                            <RequireAdmin>
                                <>
                                    <AdminNavbar />
                                    <div className="p-4">Chọn chức năng quản trị ở menu trên.</div>
                                </>
                            </RequireAdmin>
                        }
                    />
                    <Route
                        path="/admin/departments"
                        element={
                            <RequireAdmin>
                                <>
                                    <AdminNavbar />
                                    <DepartmentsAdmin />
                                </>
                            </RequireAdmin>
                        }
                    />
                    <Route
                        path="/admin/doctors"
                        element={
                            <RequireAdmin>
                                <>
                                    <AdminNavbar />
                                    <DoctorsAdmin />
                                </>
                            </RequireAdmin>
                        }
                    />
                    <Route
                        path="/admin/schedules"
                        element={
                            <RequireAdmin>
                                <>
                                    <AdminNavbar />
                                    <SchedulesAdmin />
                                </>
                            </RequireAdmin>
                        }
                    />
                    <Route
                        path="/admin/approved-schedules"
                        element={
                            <RequireAdmin>
                                <>
                                    <AdminNavbar />
                                    <ApprovedSchedulesAdmin />
                                </>
                            </RequireAdmin>
                        }
                    />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}
