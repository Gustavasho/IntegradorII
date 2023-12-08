const { save, listAll, update, remove } = require('../services/user.service');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const formData = req.body;
  save(formData)
    .then(data => res.status(200).json({ data }))
    .catch(trace => res.status(500).json({ err: 'No se puede crear user', trace }));
});

router.get('/', (req, res) => {
  listAll()
    .then(data => res.status(200).json({ data }))
    .catch(trace => res.status(500).json({ err: 'No se pueden listar los users', trace }));
});

router.put('/id/:userId', (req, res) => {
  const subactividadId = req.params.subactividadId;
  const formData = req.body;
  update(subactividadId, formData)
    .then(data => res.status(200).json({ data }))
    .catch(trace => res.status(500).json({ err: 'No se puede actualizar el user', trace }));
});

router.delete('/id/:userId', (req, res) => {
  const subactividadId = req.params.subactividadId;
  remove(subactividadId)
    .then(data => res.status(200).json({ data }))
    .catch(trace => res.status(500).json({ err: 'No se puede eliminar el user', trace }));
});


module.exports = router;