function allTeams() {

  return [
    {
      id: 1,
      name: "Ajax Amsterdam",
      teamLogo: "../img/teams/ajax.jpg"
    },
    {
      id: 2,
      name: "PSV",
      teamLogo: "../img/teams/psv.jpg"
    },
    {
      id: 3,
      name: "AZ Alkmaar",
      teamLogo: "../img/teams/az.jpg"
    },
    {
      id: 4,
      name: "PEC Zwolle",
      teamLogo: "../img/teams/az.jpg"
    },
    {
      id: 5,
      name: "De Graafschap",
      teamLogo: "../img/teams/graafschap.png"
    },
    {
      id: 6,
      name: "FC Emmen",
      teamLogo: "../img/teams/"
    },
    {
      id: 7,
      name: "FC Utrecht",
      teamLogo: "../img/teams/utrecht.png"
    },
    {
      id: 8,
      name: "Fyenoord",
      teamLogo: "../img/teams/fyenoord.jpg"
    },
    {
      id: 9,
      name: "Fortuna Sittard",
      teamLogo: "../img/teams/"
    },
    {
      id: 10,
      name: "Heracles Almelo",
      teamLogo: "../img/teams/heracles-almelo.png"
    },
    {
      id: 11,
      name: "NAC Breda",
      teamLogo: "../img/teams/nac.png"
    },
    {
      id: 12,
      name: "SBV Excelsior",
      teamLogo: "../img/teams/excelsior.png"
    },
    {
      id: 13,
      name: "sc Heerenveen",
      teamLogo: "../img/teams/heerenveen.png"
    },
    {
      id: 14,
      name: "Vitesse",
      teamLogo: "../img/teams/vitesse.jpg"
    },
    {
      id: 15,
      name: "VVV-Venlo",
      teamLogo: "../img/teams/vvv.png"
    },
    {
      id: 16,
      name: "Willem II",
      teamLogo: "../img/teams/vvv.png"
    },
  ]
}

module.exports.allTeams = allTeams

function filterTeam(teamId) {
  return allTeams().filter(function(team) {
    return team.id === Number(teamId)
  })
}

module.exports.filterTeam = filterTeam
