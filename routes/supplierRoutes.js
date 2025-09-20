const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/supplierController');

router.get('/', ctrl.index);
router.get('/suppliers/new', ctrl.newForm);
router.post('/suppliers', ctrl.create);
router.get('/suppliers/:id', ctrl.show);
router.get('/suppliers/:id/edit', ctrl.editForm);
router.put('/suppliers/:id', ctrl.update);
router.delete('/suppliers/:id', ctrl.delete);

module.exports = router;
