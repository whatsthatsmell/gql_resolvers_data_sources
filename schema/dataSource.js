const got = require('got')

const url = 'https://statsapi.mlb.com/api/v1/teams/119/roster'
// https://statsapi.mlb.com/api/v1/teams/119/

module.exports = async () => {
  const { body: { roster } } = await got(url, { responseType: 'json' })
  return roster
}

module.exports.getTeam = async (teamId) => {
  const url = 'https://statsapi.mlb.com/api/v1/teams/' + teamId
  const { body: { teams: [team] } } = await got(url, { responseType: 'json' })
  return team
}
