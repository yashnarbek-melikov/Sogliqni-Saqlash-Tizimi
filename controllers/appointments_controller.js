const Appointment = require('../models/appointments_model');
const { formatModel } = require('../utils/format_date');

// ROUTE             api/appointments/add
// METHOD            POST
// DESCRIPTION       add new appointment
const addNewAppointmentControl = async (req, res) => {
   try {
      const appointment = new Appointment(
         req.body.patient_id,
         req.body.doctor_name,
         req.body.appoint_time,
         req.body.status_appoint
      );
      const newAppointment = await appointment.addNewAppointment();
      const formatAppointment = formatModel(newAppointment);
      res.status(201).json(formatAppointment);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// ROUTE             api/appointments/
// METHOD            GET
// DESCRIPTION       get all appointments
const getAllAppointmentsControl = async (req, res) => {
   try {
      const allAppointments = await Appointment.getAllAppointments();
      const formatAllAppointments = allAppointments.map(item =>
         formatModel(item)
      );
      res.status(200).json(formatAllAppointments);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// ROUTE             api/appointments/:id
// METHOD            GET
// DESCRIPTION       get one appointment by id
const getAppointmentByIdControl = async (req, res) => {
   try {
      const appointment = await Appointment.getAppointmentById(req.params.id);
      const formatAppointment = formatModel(appointment);
      res.status(200).json(formatAppointment);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// ROUTE             api/appointments/:id
// METHOD            PUT
// DESCRIPTION       update an appointment by id
const updateAppointmentByIdControl = async (req, res) => {
   try {
      const oldAppointment = await Appointment.getAppointmentById(
         req.params.id
      );
      const { patient_id, doctor_name, appoint_time, status_appoint } =
         req.body;
      const appointment = new Appointment(
         patient_id ? patient_id : oldAppointment.patient_id,
         doctor_name ? doctor_name : oldAppointment.doctor_name,
         appoint_time ? appoint_time : oldAppointment.appoint_time,
         status_appoint ? status_appoint : oldAppointment.status_appoint
      );
      const updateAppointment = await appointment.updateAppointmentById(
         req.params.id
      );
      const formatAppointment = formatModel(updateAppointment);
      res.status(201).json(formatAppointment);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// ROUTE             api/appointments/filter?start=&end=
// METHOD            GET
// DESCRIPTION       get all appointments between start and end date
const getPatientsByAppointTimeControl = async (req, res) => {
   try {
      const { start, end } = req.query;
      if (!start || !end) {
         return res
            .status(400)
            .json({ message: 'need start and end date time: YYYY-MM-DD' });
      }
      const appointment = await Appointment.getPatientsByAppointTime(
         start,
         end
      );
      const formatAppointment = appointment.map(item => formatModel(item));
      res.status(200).json(formatAppointment);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

module.exports = {
   addNewAppointmentControl,
   getAllAppointmentsControl,
   getAppointmentByIdControl,
   updateAppointmentByIdControl,
   getPatientsByAppointTimeControl,
};
