import flightsData from "../data/flights/flights.json";

export default function getSearchedFlights(origin, destination) {
	const matchedFlights = flightsData.flights.filter((flight) => {
		return (
			flight.originAirport?.city?.name.toUpperCase() ===
				origin.toUpperCase() &&
			flight.destinationAirport?.city?.name.toUpperCase() ===
				destination.toUpperCase()
		);
	});

	return matchedFlights;
}
