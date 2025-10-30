const express = require('express');
const router = express.Router();

const {
   addNewAppointmentControl,
   getAllAppointmentsControl,
   getAppointmentByIdControl,
   updateAppointmentByIdControl,
   getPatientsByAppointTimeControl,
} = require('../controllers/appointments_controller');

router.get('/filter', getPatientsByAppointTimeControl);
router.post('/add', addNewAppointmentControl);
router.get('/', getAllAppointmentsControl);
router.get('/:id', getAppointmentByIdControl);
router.put('/:id', updateAppointmentByIdControl);

module.exports = router;
