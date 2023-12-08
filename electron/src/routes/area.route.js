const { save, listAll, update, remove } = require('../services/area.service');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const formData = req.body;
  save(formData)
    .then(data => res.status(200).json({ data }))
    .catch(trace => res.status(500).json({ err: 'No se puede crear area', trace }));
});

router.get('/', (req, res) => {
  listAll()
    .then(data => res.status(200).json({ data }))
    .catch(trace => res.status(500).json({ err: 'No se pueden listar los areas', trace }));
});

router.put('/id/:areaId', (req, res) => {
  const areaId = req.params.areaId;
  const formData = req.body;
  update(areaId, formData)
    .then(data => res.status(200).json({ data }))
    .catch(trace => res.status(500).json({ err: 'No se puede actualizar el area', trace }));
});

router.delete('/id/:areaId', (req, res) => {
  const areaId = req.params.areaId;
  remove(areaId)
    .then(data => res.status(200).json({ data }))
    .catch(trace => res.status(500).json({ err: 'No se puede eliminar el area', trace }));
});


module.exports = router;