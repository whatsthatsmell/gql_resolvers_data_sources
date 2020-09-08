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
})
