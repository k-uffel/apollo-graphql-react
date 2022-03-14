const { RESTDataSource } = require('apollo-datasource-rest');
const { storeBasicAuth } = require("../utils/utils");

// Classnames camelCase
class FlightAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://s4h.sap.octavia.de:44300/rest/';
        this.apiUuid = '00mfvVRJ7kk6ZQNEIbstD0';

    }
    async getAllFlights() {
        const response = await this.get('genericapi', {
            api_uuid: this.apiUuid
        }, {
            headers: {'Authorization': 'Basic ' + storeBasicAuth.getAuth()}
        });

        return response.map(flight => this.flightReducer(flight))
    }

    async getOneFlightByPrimaryKeys({carrierID, connectionID, flightDate}) {
        const response = await this.get('genericapi', {
            api_uuid: this.apiUuid,
            CARRIER_ID: carrierID,
            CONNECTION_ID: connectionID,
            FLIGHT_DATE: flightDate
        }, {
            headers: {'Authorization': 'Basic ' + storeBasicAuth.getAuth()}
        });
        return this.flightReducer(response[0]);
    }

    async getFlightsByMultipleKeys({
                                       carrier, connection, date, price,
                                       currencyCode, planeTypeID, maxSeats, occupiedSeats
                                   }) {
        const response = await this.get('genericapi', {
            api_uuid: this.apiUuid,
            CARRIER_ID: carrier,
            CONNECTION_ID: connection,
            FLIGHT_DATE: date,
            PRICE: price,
            CURRENCY_CODE: currencyCode,
            PLANE_TYPE_ID: planeTypeID,
            SEATS_MAX: maxSeats,
            SEATS_OCCUPIED: occupiedSeats
        }, {
            headers: {'Authorization': 'Basic ' + storeBasicAuth.getAuth()}
        });

        return response.map(flight => this.flightReducer(flight))
    }

    flightReducer(flight) {
        return {
            client: flight.CLIENT,
            carrierID: flight.CARRIER_ID,
            connectionID: flight.CONNECTION_ID,
            flightDate: flight.FLIGHT_DATE,
            year: flight.FLIGHT_DATE,
            month: flight.FLIGHT_DATE,
            price: flight.PRICE,
            currencyCode: flight.CURRENCY_CODE,
            planeTypeID: flight.PLANE_TYPE_ID,
            seatsMax: flight.SEATS_MAX,
            seatsOccupied: flight.SEATS_OCCUPIED,
            cursor: flight.CARRIER_ID + '-' + flight.CONNECTION_ID + '-' + flight.FLIGHT_DATE,
            connection: flight.CONNECTION.map(connection => this.connectionReducer(connection))
        }
    }

    connectionReducer(connection) {
        return {
            client: connection.CLIENT,
            carrierID: connection.CARRIER_ID,
            connectionID: connection.CONNECTION_ID,
            airportFromID: connection.AIRPORT_FROM_ID,
            airportToID: connection.AIRPORT_TO_ID,
            departureTime: connection.DEPARTURE_TIME,
            arrivalTime: connection.ARRIVAL_TIME,
            distance: connection.DISTANCE,
            distanceUnit: connection.DISTANCE_UNIT,
            fromAirport: connection.FROMAIRPORT.map(airport => this.airportReducer(airport)),
            toAirport: connection.TOAIRPORT.map(airport => this.airportReducer(airport)),
            carrier: connection.CARRIER.map(carrier => this.carrierReducer(carrier))
        }
    }

    airportReducer(airport) {
        return {
            client: airport.CLIENT,
            airportID: airport.AIRPORT_ID,
            name: airport.NAME,
            city: airport.CITY,
            countryID: airport.COUNTRY
        }
    }

    carrierReducer(carrier) {
        return {
            client: carrier.CLIENT,
            carrierID: carrier.CARRIER_ID,
            name: carrier.NAME,
            currencyCode: carrier.CURRENCY_CODE
        }

    }
}

module.exports = FlightAPI;