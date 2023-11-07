import { defineStore } from "pinia";

export const useFlightStore = defineStore({
	id: "flights",
	state: () => ({
		flights: [],
		isFlightAvaliable: false,
		flightPrice: 0,
		flightPriceCurrency: "TRY",
		passengerNumber: 0,
	}),
	getters: {
		getFlights: (state) => state.flights,
	},
	actions: {
		setFlights(flights) {
			this.flights = flights;
		},
		setIsFlightAvaliable(isFlightAvaliable) {
			this.isFlightAvaliable = isFlightAvaliable;
		},
		setFlightPrice(flightPrice) {
			this.flightPrice = flightPrice;
		},
		setFlightPriceCurrency(flightPriceCurrency) {
			this.flightPriceCurrency = flightPriceCurrency;
		},
		setPassengerNumber(passengerNumber) {
			this.passengerNumber = passengerNumber;
		},
	},
});
