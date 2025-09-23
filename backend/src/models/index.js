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

// Associations
User.hasMany(Patient, { foreignKey: "user_id" });
Patient.belongsTo(User, { foreignKey: "user_id" });

Department.hasMany(Doctor, { foreignKey: "department_id" });
Doctor.belongsTo(Department, { foreignKey: "department_id" });

Doctor.hasMany(DoctorSchedule, { foreignKey: "doctor_id" });
DoctorSchedule.belongsTo(Doctor, { foreignKey: "doctor_id" });

Patient.hasMany(Appointment, { foreignKey: "patient_id" });
Appointment.belongsTo(Patient, { foreignKey: "patient_id" });
Doctor.hasMany(Appointment, { foreignKey: "doctor_id" });
Appointment.belongsTo(Doctor, { foreignKey: "doctor_id" });

Patient.hasMany(MedicalRecord, { foreignKey: "patient_id" });
MedicalRecord.belongsTo(Patient, { foreignKey: "patient_id" });

Vaccine.hasMany(InjectionAppointment, { foreignKey: "vaccine_id" });
InjectionAppointment.belongsTo(Vaccine, { foreignKey: "vaccine_id" });
Patient.hasMany(InjectionAppointment, { foreignKey: "patient_id" });
InjectionAppointment.belongsTo(Patient, { foreignKey: "patient_id" });

Patient.hasMany(VaccineRecord, { foreignKey: "patient_id" });
VaccineRecord.belongsTo(Patient, { foreignKey: "patient_id" });
Vaccine.hasMany(VaccineRecord, { foreignKey: "vaccine_id" });
VaccineRecord.belongsTo(Vaccine, { foreignKey: "vaccine_id" });

Appointment.hasOne(Payment, { foreignKey: "appointment_id" });
Payment.belongsTo(Appointment, { foreignKey: "appointment_id" });

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
