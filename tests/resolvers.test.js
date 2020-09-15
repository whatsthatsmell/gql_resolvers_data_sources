const ds = require('../schema/dataSource')
const resolvers = require('../schema/resolvers')
jest.mock('../schema/dataSource')

describe('Unit Testing GQL Resolvers in Node with TDD', () => {
  test('TDD should be the professional standard', async () => {
    expect(true).toBe(true)
  })
})

describe('persons resolver', () => {
  // this should be a JSON fixture
  const rosterFixture = [
    {
      person: {
        id: 608369,
        fullName: 'Corey Seager',
        link: '/api/v1/people/608369'
      },
      jerseyNumber: '5',
      position: {
        code: '6',
        name: 'Shortstop',
        type: 'Infielder',
        abbreviation: 'SS'
      },
      status: {
        code: 'A',
        description: 'Active'
      },
      parentTeamId: 119
    },
    {
      person: {
        id: 642701,
        fullName: 'Dennis Santana',
        link: '/api/v1/people/642701'
      },
      jerseyNumber: '77',
      position: {
        code: '1',
        name: 'Pitcher',
        type: 'Pitcher',
        abbreviation: 'P'
      },
      status: {
        code: 'A',
        description: 'Active'
      },
      parentTeamId: 119
    }
  ]

  ds.mockResolvedValue(rosterFixture)

  test('name should be the full name', async () => {
    const players = await resolvers.Query.players()
    expect(players[1].name).toBe('Dennis Santana')
  })

  test('position should be specific', async () => {
    const players = await resolvers.Query.players()
    expect(players[0].position).toBe('Shortstop')
  })
})

describe('team resolvers', () => {
  const teamFixture = {
    id: 119,
    name: 'Los Angeles Dodgers',
    link: '/api/v1/teams/119',
    season: 2020,
    venue: {
      id: 22,
      name: 'Dodger Stadium',
      link: '/api/v1/venues/22'
    },
    teamCode: 'lan',
    fileCode: 'la',
    abbreviation: 'LAD',
    teamName: 'Dodgers',
    locationName: 'Los Angeles',
    firstYearOfPlay: '1884',
    league: {
      id: 104,
      name: 'National League',
      link: '/api/v1/league/104'
    },
    division: {
      id: 203,
      name: 'National League West',
      link: '/api/v1/divisions/203'
    },
    sport: {
      id: 1,
      link: '/api/v1/sports/1',
      name: 'Major League Baseball'
    },
    shortName: 'LA Dodgers',
    springLeague: {
      id: 114,
      name: 'Cactus League',
      link: '/api/v1/league/114',
      abbreviation: 'CL'
    },
    allStarStatus: 'N',
    active: true
  }

  ds.getTeam.mockResolvedValue(teamFixture)
  test('team should be an object', async () => {
    const dodgers = await resolvers.Query.team(teamFixture, { id: 119 })
    expect(dodgers).toStrictEqual(teamFixture)
    expect(dodgers.id).toBe(119)
  })
})
