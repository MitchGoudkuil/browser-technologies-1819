const express = require('express')
const hbs = require('express-handlebars');
const webpush = require('web-push');
const path = require('path')
const bodyParser = require('body-parser');
const teamData = require('./helpers/teams.js')
const match = require('./helpers/match.js')
const app = express()

const publicVapidKey = "BHYcGufT3VdwZMzqDWsuqOLAe0OFOJLxrICIgk0WMwSAxQJQIVyVCQm5vwQnPfBhU7aCj7SJr8vW5NfFfpwKR8g"
const privateVapidKey = "ewnaYEwAfSsfahrN3VofQIaAEv5gL24U46vlMCwKa6Q"

let dashboardArray = []

webpush.setVapidDetails('mailto:myclub@soccer.io', publicVapidKey, privateVapidKey)

// app.use(express.static(path.join(__dirname, "client")))
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts' }))
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views')

let timer = 0
const data = {
  liveNotification: false,
  notification: false
};

setInterval(function(){
  timer += 1
  console.log(timer);
}, 1000);

function checkTime() {
  if (timer > 15) {
    return 'show'
  } else {
    return 'hide'
  }
}

function checkTimeNotification() {
  if (timer === 25) {
    return true
  } else {
    return false
  }
}

function halfTimeNotification() {
  if (timer === 35) {
    return true
  } else {
    return false
  }
}

app.post('/reset-timer', function(req, res) {
  console.log('Reset timer');
  data.liveNotification = false
  data.notification = false
  data.halfTimeNotification = false
  timer = 0
  res.redirect('/dashboard')
})

app.get('/checkNotification', function(req, res) {
  if (checkTime() === 'show') {
    data.liveNotification = true
  }

  if (checkTimeNotification()) {
    data.notification = true

  }

  if (halfTimeNotification()) {
    data.halfTimeNotification = true

  }
  res.send(data)
})


app.get('/', function(req, res) {
  res.render('team', {
    teamList: teamData.allTeams(),
    addButton: false,
  });
})

app.get('/dashboard', function(req, res) {
  const filteredTeam = teamData.filterTeam(req.query.team)
  filteredTeam.forEach(item => {
    dashboardArray.push(item)
  })

  res.render('dashboard', {
    chosenTeam: req.query.team,
    teams: dashboardArray,
    addButton: true,
    matchStart:  checkTime(),
    timer: timer
  });
})

app.post('/dashboard/team', function(req, res) {
  const subscription = req.body;
  res.status(201).json({})

  const payload = JSON.stringify({ title: 'Myclub'})

  webpush.sendNotification(subscription, payload).catch(err => console.error(err));
})

app.get('/dashboard/:team', function(req, res) {
  res.render('teampage', {
    filteredTeam: teamData.filterTeam(req.query.team),
    addButton: false,
    addButton: true,
    notification:true
  });
})

app.get('*', function(req, res){
  res.render('error');
});

var server = app.listen(3000, function() {
  console.log('server running at http://localhost:' + server.address().port)
})
