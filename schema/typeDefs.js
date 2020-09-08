const gql = require('graphql-tag')

module.exports = gql`
type Player {
  name: String
  position: String
}

type Team {
  id: ID!
  fullTeamName: String
  venue: Venue
  division: Division
  league: League
}

type Venue {
  id: ID!
  name: String
}

type Division {
  id: ID!
  name: String
}

type League {
  id: ID!
  name: String
}


type Query {
  players: [Player]
  team: Team
}
`
