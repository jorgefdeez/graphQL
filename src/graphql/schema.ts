import { gql } from 'apollo-server';

export const typeDefs = gql`

    type VideoGame {
        _id: ID!,
        name: String,
        platform: String,
        releaseYear: Int!,
    }

    type Query {
        getVideoGames: [VideoGame!]!,
        getVideoGame(id: ID!): VideoGame
    }

    type Mutation {
        addVideoGame(
            name: String!,
            platform: String!,
            releaseYear: Int!
        ): VideoGame!

        register(
            email: string!,
            password: string!
        ) : string!

        login(
            email: string!,
            password: string!
        ) : string!
    }

`;
