const express = require('express');
const router = express.Router();
const service = require('./../services/cars');


router.get('/', service.find);
router.post('/', service.create);
router.put('/:id', service.update);
router.delete('/:id', service.remove);
router.get('/new', service.new);
router.get('/edit/:id', service.edit);

module.exports = router;