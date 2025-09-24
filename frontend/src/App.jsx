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

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/doctor" element={<DoctorDetail />} />
          <Route path="/appointment" element={<RequireAuth><Appointment /></RequireAuth>} />
          <Route path="/my-appointments" element={<RequireAuth><MyAppointments /></RequireAuth>} />
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="/vaccination" element={<RequireAuth><Vaccination /></RequireAuth>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
