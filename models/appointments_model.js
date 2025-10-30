const pool = require('../config/db');

module.exports = class Appointment {
   constructor(patient_id, doctor_name, appoint_time, status_appoint) {
      this.patient_id = patient_id;
      this.doctor_name = doctor_name;
      this.appoint_time = appoint_time;
      this.status_appoint = status_appoint;
   }

   async addNewAppointment() {
      const result = await pool.query(
         `
            INSERT INTO appointments (patient_id, doctor_name, appoint_time, status_appoint) VALUES ($1, $2, $3, $4) RETURNING *
            `,
         [
            this.patient_id,
            this.doctor_name,
            this.appoint_time,
            this.status_appoint,
         ]
      );
      return result.rows[0];
   }

   static async getAllAppointments() {
      const appointments = await pool.query('SELECT * FROM appointments');
      return appointments.rows;
   }

   static async getAppointmentById(id) {
      const appointment = await pool.query(
         'SELECT * FROM appointments WHERE id = $1',
         [id]
      );
      return appointment.rows[0];
   }

   async updateAppointmentById(id) {
      const appointments = await pool.query(
         `UPDATE appointments 
        SET patient_id = $1, doctor_name = $2,
        appoint_time = $3, status_appoint = $4
        WHERE id = $5 RETURNING *`,
         [
            this.patient_id,
            this.doctor_name,
            this.appoint_time,
            this.status_appoint,
            id,
         ]
      );
      return appointments.rows[0];
   }

   static async getPatientsByAppointTime(start, end) {
      const appointments = await pool.query(
         `
         SELECT p.fullname, p.age, 
         p.state_medic, p.medic_history,
         p.contact_info, a.doctor_name,
         a.appoint_time, a.status_appoint
         FROM appointments a JOIN patients p
         ON p.id = a.patient_id
         WHERE a.appoint_time >= $1
         AND a.appoint_time <= $2
         ORDER BY a.appoint_time
         `,
         [start, end]
      );
      return appointments.rows;
   }
};
