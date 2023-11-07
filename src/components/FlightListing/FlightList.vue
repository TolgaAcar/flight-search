<template>
	<div class="flight-list">
		<div class="flight-list__sorter">
			<div class="sorter-title mr-8">Sıralama Kriteri</div>

			<div class="sort-options">
				<v-btn
					class="mr-4"
					variant="outlined"
					@click="setSortingOption(1)"
					:color="
						sortingOption === 1 ? 'light-blue-darken-1' : 'white'
					"
				>
					Ekonomi Ücreti
				</v-btn>
				<v-btn
					variant="outlined"
					@click="setSortingOption(2)"
					:color="
						sortingOption === 2 ? 'light-blue-darken-1' : 'white'
					"
				>
					Kalkış Saati
				</v-btn>
			</div>
		</div>

		<div class="flight-list-wrapper" :key="flightListKey">
			<FlightItem
				v-for="(flight, index) in flights"
				:key="`fi-${index}`"
				:flight-details="flight"
				:has-promotion-code="hasPromotionCode"
			/>
		</div>
	</div>
</template>

<script>
import FlightItem from "./FlightItem.vue";

export default {
	name: "FlightList",
	components: {
		FlightItem,
	},
	data() {
		return {
			sortingOption: "",
			flightListKey: 0,
		};
	},
	props: {
		flights: {
			type: Array,
			default: () => [],
		},
		hasPromotionCode: {
			type: Boolean,
			default: false,
		},
	},
	created() {
		this.sortFlightsByEconomyEcoFlyPrice(this.flights);
	},
	methods: {
		setSortingOption(option) {
			this.sortingOption = option;

			if (this.sortingOption === 1) {
				this.sortFlightsByEconomyEcoFlyPrice(this.flights);
			} else if (this.sortingOption === 2) {
				this.sortFlightsByDepartureTimeAscending(this.flights);
			}

			this.flightListKey++;
		},
		sortFlightsByEconomyEcoFlyPrice(flights) {
			// Use the sort() method with a custom comparison function
			flights.sort((a, b) => {
				// Find the "ECONOMY" class for both flights
				const economyA = a.fareCategories.ECONOMY;
				const economyB = b.fareCategories.ECONOMY;

				// Find the "ecoFly" brand price for both flights
				const ecoFlyPriceA = economyA.subcategories.find(
					(sub) => sub.brandCode === "ecoFly",
				).price.amount;
				const ecoFlyPriceB = economyB.subcategories.find(
					(sub) => sub.brandCode === "ecoFly",
				).price.amount;

				// Compare the ecoFly prices for sorting
				return ecoFlyPriceA - ecoFlyPriceB;
			});
		},
		sortFlightsByDepartureTimeAscending(flights) {
			flights.sort((a, b) => {
				const timeA = a.departureDateTimeDisplay;
				const timeB = b.departureDateTimeDisplay;

				// Custom comparison function for time in "HH:mm" format
				function compareTime(time1, time2) {
					const [hours1, minutes1] = time1.split(":").map(Number);
					const [hours2, minutes2] = time2.split(":").map(Number);

					if (hours1 === hours2) {
						return minutes1 - minutes2; // Compare minutes if hours are the same
					} else {
						return hours1 - hours2; // Compare hours if different
					}
				}

				return compareTime(timeA, timeB); // Sort in ascending order
			});
		},
	},
};
</script>

<style scoped>
.flight-list__sorter {
	padding: 10px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	background-color: var(--filter-background-color);
	color: white;
}

.flight-list-wrapper {
	background-color: var(--background-color-secondary);
}
</style>
