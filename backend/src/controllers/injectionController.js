const { InjectionAppointment, VaccineRecord } = require("../models/index");

exports.create = async (req, res) => {
    const { patient_id, vaccine_id, date, time, dose_number } = req.body;
    const inj = await InjectionAppointment.create({ patient_id, vaccine_id, date, time, dose_number });
    res.json(inj);
};

exports.complete = async (req, res) => {
    const { id } = req.params;
    const inj = await InjectionAppointment.findByPk(id);
    if (!inj) return res.status(404).json({ message: "Not found" });
    inj.status = "done";
    await inj.save();
    await VaccineRecord.create({ patient_id: inj.patient_id, vaccine_id: inj.vaccine_id, dose_number: inj.dose_number, date: inj.date });
    res.json(inj);
};

exports.listByPatient = async (req, res) => {
    const { patientId } = req.params;
    const list = await InjectionAppointment.findAll({ where: { patient_id: patientId } });
    res.json(list);
};
