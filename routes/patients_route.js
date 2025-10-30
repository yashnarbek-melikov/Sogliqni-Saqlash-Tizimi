const express = require('express');
const router = express.Router();

const {
   addNewPatientControl,
   getAllPatientsControl,
   getPatientByIdControl,
   updatePatientByIdControl,
   deletePatientByIdControl,
   getPatientByMedicStateControl,
} = require('../controllers/patients_controller');

router.get('/state', getPatientByMedicStateControl);
router.post('/add', addNewPatientControl);
router.get('/', getAllPatientsControl);
router.get('/:id', getPatientByIdControl);
router.put('/:id', updatePatientByIdControl);
router.delete('/:id', deletePatientByIdControl);

module.exports = router;
