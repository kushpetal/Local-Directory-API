import {gql} from "apollo-server-express";

const typeDefs = gql`

    type Attributes {
        name: String
        path: String
        size: String
        extension: String
        type: String
        children: [Attributes]
    }

    type Query {
        fileDirectory(rootPath: String!, depth: Int!): Attributes
    }
`
export default typeDefs;
