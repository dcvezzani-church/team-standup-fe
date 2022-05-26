var express = require('express');
var router = express.Router();
const { teamMembers, statusReportHistory, prayerHistory, vacationPlans, getTeamStandup, teamStandup } = require('../services')
const fs = require('fs')

/* GET home page. */

router.get('/team', async function(req, res, next) {
  res.json(await teamMembers());
});

router.get('/team/vacation', async function(req, res, next) {
  res.json(await vacationPlans());
});

router.get('/team/prayers', async function(req, res, next) {
  res.json(await prayerHistory());
});

router.get('/team/status', async function(req, res, next) {
  res.json(await statusReportHistory());
});

router.get('/team/standup/:id', async function(req, res, next) {
  if (req.query.mock == 'true') {
    const id = req.params.id;
    const standup = JSON.parse(fs.readFileSync(`./mock/standup.json`).toString());
    return res.json(standup);
  }

  teamStandup(req.params.id)
  .then(data => {
    if (data.err) return next(new Error(data.err))
    res.json(data);
  })

});

router.get('/', function(req, res, next) {
  res.json({ title: 'Express' });
});

router.get('*', function(req, res) {
      throw new Error("Unsupported api endpoint");
});


module.exports = router;
