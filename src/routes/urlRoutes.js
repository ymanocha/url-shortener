const express = require('express');
const router = express.Router();
const {createShort, getShort, updateShort, deleteShort} = require('../controllers/urlController')

router.route('/').post(createShort)
router.route('/:id').get(getShort).put(updateShort).delete(deleteShort)

module.exports = router;