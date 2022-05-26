exports.exceptionHandlers = {
  'non-prod': function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).json({error: {
      code: 500,
      message: err.message,
      stack: err.stack.split('\n').filter(entry => (entry.includes('team-standup-fe') && !entry.includes('node_modules')))
    }})
  },
  prod: function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).json({error: {
      code: 500,
      message: 'Server exception',
    }})
  },
}

