const sequelize = require("../config/database");

const User = require("./User");
const Patient = require("./Patient");
const Department = require("./Department");
const Doctor = require("./Doctor");
const DoctorSchedule = require("./DoctorSchedule");
const Appointment = require("./Appointment");
const MedicalRecord = require("./MedicalRecord");
const Vaccine = require("./Vaccine");
const InjectionAppointment = require("./InjectionAppointment");
const VaccineRecord = require("./VaccineRecord");
const Payment = require("./Payment");

User.hasMany(Patient, { foreignKey: "user_id", as: "patients" });
Patient.belongsTo(User, { foreignKey: "user_id", as: "user" });

Department.hasMany(Doctor, { foreignKey: "department_id", as: "doctors" });
Doctor.belongsTo(Department, { foreignKey: "department_id", as: "department" });

Doctor.hasMany(DoctorSchedule, { foreignKey: "doctor_id", as: "schedules" });
DoctorSchedule.belongsTo(Doctor, { foreignKey: "doctor_id", as: "doctor" });

Patient.hasMany(Appointment, { foreignKey: "patient_id", as: "appointments" });
Appointment.belongsTo(Patient, { foreignKey: "patient_id", as: "patient" });
Doctor.hasMany(Appointment, { foreignKey: "doctor_id", as: "appointments" });
Appointment.belongsTo(Doctor, { foreignKey: "doctor_id", as: "doctor" });

Patient.hasMany(MedicalRecord, { foreignKey: "patient_id", as: "medicalRecords" });
MedicalRecord.belongsTo(Patient, { foreignKey: "patient_id", as: "patient" });

Vaccine.hasMany(InjectionAppointment, { foreignKey: "vaccine_id", as: "injectionAppointments" });
InjectionAppointment.belongsTo(Vaccine, { foreignKey: "vaccine_id", as: "vaccine" });
Patient.hasMany(InjectionAppointment, { foreignKey: "patient_id", as: "injectionAppointments" });
InjectionAppointment.belongsTo(Patient, { foreignKey: "patient_id", as: "patient" });

Patient.hasMany(VaccineRecord, { foreignKey: "patient_id", as: "vaccineRecords" });
VaccineRecord.belongsTo(Patient, { foreignKey: "patient_id", as: "patient" });
Vaccine.hasMany(VaccineRecord, { foreignKey: "vaccine_id", as: "vaccineRecords" });
VaccineRecord.belongsTo(Vaccine, { foreignKey: "vaccine_id", as: "vaccine" });

Appointment.hasOne(Payment, { foreignKey: "appointment_id", as: "payment" });
Payment.belongsTo(Appointment, { foreignKey: "appointment_id", as: "appointment" });

module.exports = {
    sequelize,
    User,
    Patient,
    Department,
    Doctor,
    DoctorSchedule,
    Appointment,
    MedicalRecord,
    Vaccine,
    InjectionAppointment,
    VaccineRecord,
    Payment
};
