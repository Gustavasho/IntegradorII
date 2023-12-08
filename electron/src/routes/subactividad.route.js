const { save, listAll, update, remove } = require('../services/subactividad.service');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const formData = req.body;
  save(formData)
    .then(data => res.status(200).json({ data }))
    .catch(trace => res.status(500).json({ err: 'No se puede crear la subactividad', trace }));
});

router.get('/', (req, res) => {
  listAll()
    .then(data => res.status(200).json({ data }))
    .catch(trace => res.status(500).json({ err: 'No se pueden listar todas las subactividades', trace }));
});

router.put('/id/:subactividadId', (req, res) => {
  const subactividadId = req.params.subactividadId;
  const formData = req.body;
  update(subactividadId, formData)
    .then(data => res.status(200).json({ data }))
    .catch(trace => res.status(500).json({ err: 'No se puede actualizar la subactividad', trace }));
});

router.delete('/id/:subactividadId', (req, res) => {
  const subactividadId = req.params.subactividadId;
  remove(subactividadId)
    .then(data => res.status(200).json({ data }))
    .catch(trace => res.status(500).json({ err: 'No se puede eliminar la subactividad', trace }));
});


module.exports = router;