const Patient = require('../models/patients_model');
const { formatModel } = require('../utils/format_date');

// ROUTE             api/patients/add
// METHOD            POST
// DESCRIPTION       add new patient
const addNewPatientControl = async (req, res) => {
   try {
      const patient = new Patient(
         req.body.fullname,
         req.body.age,
         req.body.state_medic,
         req.body.medic_history,
         req.body.contact_info
      );
      const newPatient = await patient.addNewPatient();
      const formatPatient = formatModel(newPatient);
      res.status(201).json(formatPatient);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// ROUTE             api/patients/
// METHOD            GET
// DESCRIPTION       get all patients
const getAllPatientsControl = async (req, res) => {
   try {
      const allPatients = await Patient.getAllPatients();
      const formatAllPatients = allPatients.map(item => formatModel(item));
      res.status(200).json(formatAllPatients);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// ROUTE             api/patients/:id
// METHOD            GET
// DESCRIPTION       get a patient by id
const getPatientByIdControl = async (req, res) => {
   try {
      const patient = await Patient.getPatientById(req.params.id);
      const formatPatient = formatModel(patient);
      res.status(200).json(formatPatient);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// ROUTE             api/patients/:id
// METHOD            PUT
// DESCRIPTION       update a patient by id
const updatePatientByIdControl = async (req, res) => {
   try {
      const oldPatient = await Patient.getPatientById(req.params.id);
      const { fullname, age, state_medic, medic_history, contact_info } =
         req.body;
      const patient = new Patient(
         fullname ? fullname : oldPatient.fullname,
         age ? age : oldPatient.age,
         state_medic ? state_medic : oldPatient.state_medic,
         medic_history ? medic_history : oldPatient.medic_history,
         contact_info ? contact_info : oldPatient.contact_info
      );
      const updatePatient = await patient.updatePatientById(req.params.id);
      const formatPatient = formatModel(updatePatient);
      res.status(201).json(formatPatient);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// ROUTE             api/patients/:id
// METHOD            DELETE
// DESCRIPTION       delete a patient by id
const deletePatientByIdControl = async (req, res) => {
   try {
      await Patient.deletePatientById(req.params.id);
      res.status(200).json({ message: 'Patient successfully deleted!' });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// ROUTE             api/patients/?state=
// METHOD            GET
// DESCRIPTION       get all patients by medical state
const getPatientByMedicStateControl = async (req, res) => {
   try {
      const { status } = req.query;
      if (!status) {
         return res.status(400).json({ message: 'need write only enum types' });
      }
      const patient = await Patient.getPatientByMedicState(status);
      const formatPatient = patient.map(item => formatModel(item));
      res.status(200).json(formatPatient);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

module.exports = {
   addNewPatientControl,
   getAllPatientsControl,
   getPatientByIdControl,
   updatePatientByIdControl,
   deletePatientByIdControl,
   getPatientByMedicStateControl,
};
