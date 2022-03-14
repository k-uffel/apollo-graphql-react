const {gql} = require('apollo-server');
"Fieldnames Should be camelCase"
const typeDefs = gql`
    scalar Date
    scalar Year
    scalar Month

    "Flight Root Data"
    type Flight {
        client: Int
        carrierID: ID!
        connectionID: ID!
        flightDate: Date!
        year: Year
        month: Month
        price: Int
        currencyCode: String
        planeTypeID: String
        seatsMax: Int
        seatsOccupied: Int
        cursor: String
        connection: [Connection]
    }

    type Connection {
        client: Int
        carrierID: ID!
        connectionID: ID!
        airportFromID: ID
        airportToID: ID
        departureTime: String
        arrivalTime: String
        distance: Int
        distanceUnit: String
        fromAirport: [Airport]
        toAirport: [Airport]
        carrier: [Carrier]
    }

    type Airport {
        client: Int
        airportID: ID!
        name: String
        city: String
        countryID: String
    }

    type Carrier {
        client: Int
        carrierID: ID!
        name: String
        currencyCode: String
    }

    type Authentication {
        status: Int
        statusText: String
    }

    """
    Simple wrapper around our list of flights that contains a cursor to the
    last item in the list. Pass this cursor to the flights query to fetch results
    after these.
    """
    type FlightConnection {
        cursor: String!
        hasMore: Boolean!
        flightsPaged: [Flight]!
    }

    "The Field 'flightsPaged' in 'FlightConnection' and corresponding Query Field musst have the same Name"

    type Query {
        allFlights: [Flight]!

        flightsPaged(
            """
            The number of results to show. Must be >= 1. Default = 20
            """
            pageSize: Int
            """
            If you add a cursor here, it will only return results _after_ this cursor
            """
            after: String
        ): FlightConnection!

        flight(carrier: ID!, connection: ID!, date: Date!): Flight

        flightsWithParameters(carrier: ID, connection: ID, date: Date, price: Int,
            currencyCode: String, planeID: String, maxSeats: Int, occupiedSeats: Int): [Flight]
        
        authenticate(userName: String!, password: String!): Authentication
        
    }
`;

module.exports = typeDefs;