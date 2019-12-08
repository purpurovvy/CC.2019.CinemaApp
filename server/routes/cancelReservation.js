const express = require('express');
const router = express.Router();

router.delete('/api/reservations/:id', (req, res) => {
    const reservation = router.find(c => c.id === parseInt(req.params.id));
    if (!reservation) return res.status(404).send('The reservation with the given ID was not found');

    const index = router.indexOf(reservation);
    router.splice(index, 1);

    res.send(reservation);
});

module.exports = router;