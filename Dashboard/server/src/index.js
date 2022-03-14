const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const login = require('./datasources/login');
const flightApi = require('./datasources/flight');
const resolvers = require('./resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
        login: new login( ),
        flightApi: new flightApi( ),
        };
    },
});


server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});