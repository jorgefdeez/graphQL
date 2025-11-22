import { gql } from 'apollo-server';

export const typeDefs = gql`

    type Album {
        id: ID!,
        title: String,
        artists: String,
        releaseDate: String,
        format: String
    }

    type Query {
        getAlbums: [Album],
        getAlbum(id: ID!): Album
    }

    type Mutation {
        addAlbum(
            title: String!,
            artists: String!,
            releaseDate: String!,
            format: String,
        ): Album!
    }

`;
