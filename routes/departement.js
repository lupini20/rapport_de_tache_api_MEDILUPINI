const express = require('express');
const router = express.Router();
const departementController = require('../controllers/departement');

router.post('/', departementController.create);
router.get('/', departementController.getAlls);
router.get('/:id', departementController.getOne);
router.put('/:id', departementController.update);
router.delete('/:id', departementController.delete);

module.exports = router;
