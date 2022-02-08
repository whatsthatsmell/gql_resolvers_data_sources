const ds = require('../schema/datasource')
const nock = require('nock')

describe('dataSource', () => {
  test('a roster list is returned', async () => {
    nock('https://statsapi.mlb.com').get('/api/v1/teams/119/roster')
      .replyWithFile(200, `${__dirname}/fixtures/roster.json`, {
        'Content-Type': 'application/json'
      })
    const roster = await ds()
    expect(roster).toEqual(expect.any(Array))
    expect(roster[0].person.fullName).toBe('Adam Kolarek')
  })

  test('a team object is returned', async () => {
    nock('https://statsapi.mlb.com').get('/api/v1/teams/119')
      .replyWithFile(200, `${__dirname}/fixtures/team.json`, {
        'Content-Type': 'application/json'
      })
    const team = await ds.getTeam(119)
    expect(team).toEqual(expect.any(Object))
    expect(team.venue.name).toBe('Dodger Stadium')
  })
})
