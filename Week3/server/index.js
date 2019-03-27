const express = require('express')
const app = express()
const hbs = require('express-handlebars');
const teamData = require('./helpers/teams.js')

app.use(express.static(__dirname + '/public'))
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts' }))
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views')


app.get('/', function(req, res) {
  res.render('team', {
    teamList: teamData.allTeams(),
    addButton: false,
  });
})

app.get('/dash', function(req, res) {
  console.log(teamData.filterTeam(req.query.team));
  res.render('dashboard', {
    chosenTeam: req.query.team,
    filteredTeam: teamData.filterTeam(req.query.team),
    addButton: true,
  });
})

app.get('*', function(req, res){
  res.render('error');
});

var server = app.listen(3000, function() {
  console.log('server running at http://localhost:' + server.address().port)
})
