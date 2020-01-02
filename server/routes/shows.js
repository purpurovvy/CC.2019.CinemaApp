const { Show } = require('../db/models/show');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  console.log('Looking for available shows...');
  const result = await Show.find()
    .populate('movie')
    .sort('startDate');
  res.send(result);
});

router.get('/plan/:showDate', async (req, res) => {
  console.log(`Check what we cast on ${req.params.showDate}...`);
  let date = new Date(req.params.showDate).toISOString();
  console.log(`First date: ${date}`);

  const result = await Show.find({ startDate: { $gte: date } }).populate('movie');
  res.send(result);
});

router.get('/:id', async (req, res) => {
  
  const show = await Show.findById(req.params.id)
  if (show) return res.status(404).send('Show with the given ID was not found.');

  res.send(show);
});
router.get ('/:id/seats', async (req, res) => {
  // const show = await Show.findById(req.params.id);
  // if(!show) return res.status(400).send('Invalid show id');

  const show = await Show.findById(req.params.id) 
    

  if(!show) return res.status(400).send('No seats found for this show id');
  res.send(show.screeningRoom)
})

module.exports = router;
