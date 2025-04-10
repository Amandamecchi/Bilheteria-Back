const express = require('express');
const router = express.Router();
const ingressoController = require('../controllers/ingressoController');

router.get('/ingressos', ingressoController.getAllngressos);
router.get('/ingressos/:id', ingressoController.getIngressoById);
router.post('/ingressos', ingressoController.createIngresso);   
router.put('/ingressos/:id', ingressoController.updateIngresso);
router.delete('/ingressos/:id', ingressoController.deleteIngresso);
router.post('/venda', ingressoController.createVenda);

module.exports = router;