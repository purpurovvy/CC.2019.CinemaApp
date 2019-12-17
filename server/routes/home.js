const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.error('ToDo...');
  res.sendStatus(404);
});

module.exports = router;
