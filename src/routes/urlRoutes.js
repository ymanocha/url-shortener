const express = require('express');
const router = express.Router();
const {createShort, getShort, updateShort, deleteShort, getURLstats} = require('../controllers/urlController')

router.route('/').post(createShort)
router.route('/:id').get(getShort).put(updateShort).delete(deleteShort)
router.route('/:id/stats').get(getURLstats)
module.exports = router;