const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { config } = require('../config')

async function fetchHandler(response) {
    if (!response.ok) {
      throw new HTTPResponseError(response);
    } else {
      // response.status >= 200 && response.status < 300
    }

  return response.json()
  .then(data => data)
  .catch(async error => {
    console.error(error);

    const errorBody = await error.response.text();
    console.error(`Error body: ${errorBody}`);
  })
}

exports.teamStandup = function() {
  return fetch(`${config.baseUrl}/api/team/standup/:id`, {
    method: 'get',
    headers: {'Content-Type': 'application/json'}
  })
  .then(fetchHandler)
  .catch(err => Promise.resolve({err}))
}

exports.teamMembers = function() {
  return fetch(`${config.baseUrl}/api/team`, {
    method: 'get',
    headers: {'Content-Type': 'application/json'}
  })
  .then(fetchHandler)
}

exports.statusReportHistory = function() {
  return fetch(`${config.baseUrl}/api/team/status`, {
    method: 'get',
    headers: {'Content-Type': 'application/json'}
  })
  .then(fetchHandler)
}

exports.prayerHistory = function() {
  return fetch(`${config.baseUrl}/api/team/prayers`, {
    method: 'get',
    headers: {'Content-Type': 'application/json'}
  })
  .then(fetchHandler)
}

exports.vacationPlans = function() {
  return fetch(`${config.baseUrl}/api/team/vacation`, {
    method: 'get',
    headers: {'Content-Type': 'application/json'}
  })
  .then(fetchHandler)
}

