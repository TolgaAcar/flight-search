import { expect, test } from "vitest";
import getSearchedFlights from "../module/FlightsBusiness";

test("it returns matched flights for valid origin and destination", () => {
	const origin = "istanbul";
	const destination = "antalya";

	expect(getSearchedFlights(origin, destination).length).toBe(4);
});

test("it handles case-insensitive origin and destination", () => {
	const origin = "iSTaNbul";
	const destination = "anTalya";

	expect(getSearchedFlights(origin, destination).length).toBe(4);
});

test("it returns an empty array for non-matching origin and destination", () => {
	const origin = "New York";
	const destination = "Miami";

	const result = getSearchedFlights(origin, destination);

	expect(result).toEqual([]);
});
