import React, {Fragment} from 'react';
import {gql, useQuery} from "@apollo/client";
import {prepNumberOfFlightsPerYear} from "../utils/flightData";
import NumberOfFlightsComp from '../components/dashboard/numberOfFlights/numberOfFlightsComp'

const GET_ALL_FLIGHTS = gql`
    query AllFlights {
        allFlights {
            carrierID
            connectionID
            flightDate
            year
            cursor
        }
    }
`;

function Dashboard () {
    const {data, loading, error} = useQuery(GET_ALL_FLIGHTS);
    if (loading) return <p>Loading</p>;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;

    const dataset = prepNumberOfFlightsPerYear(data.allFlights);

    return (
        <Fragment>
            <NumberOfFlightsComp chartDataset={dataset}/>
        </Fragment>
    );
}
export default Dashboard;