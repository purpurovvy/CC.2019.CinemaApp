const express = require('express');
const router = express.Router();

router.get('/api/reservations/:id', (req, res) => {
    const reservation = router.find(c => c.id === parseInt(req.params.id));
    if (!reservation) return res.status(404).send('the reservation with the given ID was not found')
    res.send(reservation);
});

module.exports = router;