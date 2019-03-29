const express = require('express')
const hbs = require('express-handlebars');
const webpush = require('web-push');
const path = require('path')
const bodyParser = require('body-parser');
const teamData = require('./server/helpers/teams.js')
const match = require('./server/helpers/match.js')
const laggard = require('laggard');
const app = express()

const publicVapidKey = "BHYcGufT3VdwZMzqDWsuqOLAe0OFOJLxrICIgk0WMwSAxQJQIVyVCQm5vwQnPfBhU7aCj7SJr8vW5NfFfpwKR8g"
const privateVapidKey = "ewnaYEwAfSsfahrN3VofQIaAEv5gL24U46vlMCwKa6Q"
webpush.setVapidDetails('mailto:myclub@soccer.io', publicVapidKey, privateVapidKey)

app.use(express.static(__dirname + '/server/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false}))
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/server/views/layouts' }))
app.set('view engine', 'hbs');
app.set('views', __dirname + '/server/views')

let timer = 0
const data = {
  liveNotification: false,
  notification: false,
  halfTimeNotification: false,
};
let dashboardArray = []
let yourTeam = null
let oponentTeam = null
let subscription = null
let teamScore = 0
let oponentScore = 0

// on page notifications
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

function resetTimer() {
  data.liveNotification = false
  data.notification = false
  data.halfTimeNotification = false
  timer = 0
}

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

app.post('/dashboard', function(req, res) {
  const filteredTeam = teamData.filterTeam(req.body.team)
  console.log(req.body);
  filteredTeam.forEach(item => {
    dashboardArray.push(item)
  })
  res.redirect('/dashboard')
})

app.get('/dashboard', function(req, res) {
  res.render('dashboard', {
    chosenTeam: req.query.team,
    teams: dashboardArray,
    addButton: true,
    matchStart:  checkTime(),
    timer: timer,
    yourTeam: yourTeam,
    oponentTeam: oponentTeam
  });
})

app.post('/dashboard/team', function(req, res) {
  subscription = req.body;
  res.status(201).json({})
  if (dashboardArray.length > 0) {
    gameSimulation()
    resetTimer()
  }
})

let showOnce = false
let showAgain = false

function gameSimulation() {
  yourTeam = dashboardArray[Math.floor(Math.random()*dashboardArray.length)];
  oponentTeam = teamData.allTeams()[Math.floor(Math.random()*teamData.allTeams().length)];

  setInterval(function(){
    timer += 1
    if(timer === 15 && showOnce === false) {
      const body = 'The game between ' + yourTeam.name + ' and ' + oponentTeam.name + ' started'
      pushNotification(body)
      showOnce = true
        }
    if(timer === 25 && showAgain === false) {
      const body = yourTeam.name + ' scored against ' + oponentTeam.name
      pushNotification(body)
      showAgain = true
    }
    if(timer === 35) {
      const body = 'The game between ' + yourTeam.name + ' and ' + oponentTeam.name + ' paused.'
      pushNotification(body)
    }
  }, 1000);
}

function pushNotification(body) {
  const payload = JSON.stringify({
    title: 'Myclub',
    body: body
})
  webpush.sendNotification(subscription, payload).catch(err => console.error(err));
}

app.get('/dashboard/:team', function(req, res) {
  res.render('teampage', {
    filteredTeam: teamData.filterTeam(req.query.team),
    addButton: false,
    addButton: true,
    notification:true,
  });
})

app.get('*', function(req, res){
  res.render('error');
});

var server = app.listen(3000, function() {
  console.log('server running at http://localhost:' + server.address().port)
})
