export const typeDefs = `#graphql
    type Query {
        getContact(id:String!):Contact!
        getContacts:[Contact!]!
    }

    type Mutation {
        addContact(name: String!, phoneNumber: String!):Contact!
        deleteContact(id:String!):Contact!
        updateContact(name: String!, phoneNumber: String!):Contact!
    }

    type Contact {
        id: String!,
        name: String!,
        phoneNumber: String!,
        country: String!,
        capital: String!,
        datetime: String! 
    }
`