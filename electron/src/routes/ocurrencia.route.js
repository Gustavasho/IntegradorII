const { save, listAll, update, remove } = require('../services/ocurrencia.service');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const formData = req.body;
  save(formData)
    .then(data => res.status(200).json({ data }))
    .catch(trace => res.status(500).json({ err: 'No se puede crear la ocurrencia', trace }));
});

router.get('/', (req, res) => {
  listAll()
    .then(data => res.status(200).json({ data }))
    .catch(trace => res.status(500).json({ err: 'No se pueden listar todas las ocurrencias', trace }));
});

router.put('/id/:ocurrenciaId', (req, res) => {
  const ocurrenciaId = req.params.ocurrenciaId;
  const formData = req.body;
  update(ocurrenciaId, formData)
    .then(data => res.status(200).json({ data }))
    .catch(trace => res.status(500).json({ err: 'No se puede actualizar la ocurrencia', trace }));
});

router.delete('/id/:ocurrenciaId', (req, res) => {
  const ocurrenciaId = req.params.ocurrenciaId;
  remove(ocurrenciaId)
    .then(data => res.status(200).json({ data }))
    .catch(trace => res.status(500).json({ err: 'No se puede eliminar la ocurrencia', trace }));
});


module.exports = router;