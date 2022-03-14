const {GraphQLScalarType} = require('graphql');
const {Kind} = require('graphql/language');
const {paginateResults} = require('./utils/utils');

module.exports = {
    Query: {
        allFlights: async (_, __, {dataSources}) =>
            dataSources.flightApi.getAllFlights(),

        flightsPaged: async (_, {pageSize = 20, after}, {dataSources}) => {
            const flights = await dataSources.flightApi.getAllFlights();
            flights.reverse();
            // Name of Query property must be in return
            const flightsPaged = paginateResults({
                after,
                pageSize,
                results: flights
            });
            return {
                flightsPaged,
                cursor: flightsPaged.length ? flightsPaged[flightsPaged.length - 1].cursor : null,
                // if the cursor at the end of the paginated results is the same as the
                // last item in _all_ results, then there are no more results after this
                hasMore: flightsPaged.length
                    ? flightsPaged[flightsPaged.length - 1].cursor !==
                    flights[flights.length - 1].cursor
                    : false
            };

        },

        flight: (_, {carrier, connection, date}, {dataSources}) =>
            dataSources.flightApi.getOneFlightByPrimaryKeys({
                carrierID: carrier,
                connectionID: connection,
            }),

        flightsWithParameters: (_, {
            carrier, connection, date, price,
            currencyCode, planeTypeID, maxSeats, occupiedSeats
        }, {dataSources}) =>
            dataSources.flightApi.getFlightsByMultipleKeys({
                carrier: carrier,
                connection: connection,
                date: date,
                price: price,
                currencyCode: currencyCode,
                planeTypeID: planeTypeID,
                maxSeats: maxSeats,
                occupiedSeats: occupiedSeats
            }),

        authenticate: (_, {userName, password}, {dataSources}) =>
            dataSources.login.authenticate({userName: userName, password: password}),

    },

    //Date from SAP is in Format XXXX-XX-XX
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return value.replace(/-/g, ''); // value from the client
        },
        serialize(value) {
            return value.replace(/-/g, ''); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.STRING) {
                return ast.value; // ast value is always in string format
            }
            return null;
        },
    }),

    Year: new GraphQLScalarType({
        name: 'Year',
        description: 'Year custom scalar type. Extracting year from flightDate.',
        parseValue(value) {
            return parseInt(value.substring(0, 4), 10);
        },
        serialize(value) {
            return parseInt(value.substring(0, 4), 10);
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return ast.value;
            }
            return null;
        }
    }),

    Month: new GraphQLScalarType({
        name: 'Month',
        description: 'Month custom scalar type. Extracting year from flightDate.',
        parseValue(value) {
            return parseInt(value.substring(5, 7), 10);
        },
        serialize(value) {
            return parseInt(value.substring(5, 7), 10);
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return ast.value;
            }
            return null;
        }
    })
};