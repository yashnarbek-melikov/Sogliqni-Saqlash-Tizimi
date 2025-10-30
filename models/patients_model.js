const pool = require('../config/db');

module.exports = class Patient {
   constructor(fullname, age, state_medic, medic_history, contact_info) {
      this.fullname = fullname;
      this.age = age;
      this.state_medic = state_medic;
      this.medic_history = medic_history;
      this.contact_info = contact_info;
   }

   async addNewPatient() {
      const result = await pool.query(
         `
            INSERT INTO patients (fullname, age, state_medic,
             medic_history, contact_info) VALUES ($1, $2, $3, $4, $5) RETURNING *
            `,
         [
            this.fullname,
            this.age,
            this.state_medic,
            this.medic_history,
            this.contact_info,
         ]
      );
      return result.rows[0];
   }

   static async getAllPatients() {
      const patients = await pool.query('SELECT * FROM patients');
      return patients.rows;
   }

   static async getPatientById(id) {
      const patient = await pool.query('SELECT * FROM patients WHERE id = $1', [
         id,
      ]);
      return patient.rows[0];
   }

   async updatePatientById(id) {
      const result = await pool.query(
         `
         UPDATE patients SET fullname = $1, age = $2, state_medic = $3,
         medic_history = $4, contact_info = $5 WHERE id = $6 RETURNING * 
         `,
         [
            this.fullname,
            this.age,
            this.state_medic,
            this.medic_history,
            this.contact_info,
            id,
         ]
      );
      return result.rows[0];
   }

   static async deletePatientById(id) {
      await pool.query(
         `
         DELETE FROM patients WHERE id = $1
         `,
         [id]
      );
   }

   static async getPatientByMedicState(medic_state) {
      const patients = await pool.query(
         `
         SELECT * FROM patients
         WHERE state_medic = $1
         `,
         [medic_state]
      );
      return patients.rows;
   }
};
