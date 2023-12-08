const { save, listAll, update, remove } = require('../services/actividad.service');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const formData = req.body;
  save(formData)
    .then(data => res.status(200).json({ data }))
    .catch(trace => res.status(500).json({ err: 'No se puede crear la actividad', trace }));
});

router.get('/', (req, res) => {
  listAll()
    .then(data => res.status(200).json({ data }))
    .catch(trace => res.status(500).json({ err: 'No se pueden listar todas las actividades', trace }));
});

router.put('/id/:actividadId', (req, res) => {
  const actividadId = req.params.actividadId;
  const formData = req.body;
  update(actividadId, formData)
    .then(data => res.status(200).json({ data }))
    .catch(trace => res.status(500).json({ err: 'No se puede actualizar la actividad', trace }));
});

router.delete('/id/:actividadId', (req, res) => {
  const actividadId = req.params.actividadId;
  remove(actividadId)
    .then(data => res.status(200).json({ data }))
    .catch(trace => res.status(500).json({ err: 'No se puede eliminar la actividad', trace }));
});


module.exports = router;