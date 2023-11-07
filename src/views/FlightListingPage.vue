<template>
	<div class="flight-listing">
		<v-container v-if="!hasError">
			<h1 v-if="searchSummary" class="search-summary mb-5">
				{{ searchSummary }}
			</h1>

			<div class="promotion-code mb-10">
				<div class="promotion-selector mb-4">
					<h4 class="mr-4">Promosyon Kodu</h4>
					<v-switch
						v-model="hasPromotionCode"
						color="blue-darken-1"
						hide-details
						inset
					/>
				</div>

				<div class="promotion-hints" v-if="hasPromotionCode">
					<div class="mb-4">
						Promosyon kodu seçeneği ile tüm Economy kabini Eco Fly
						paketlerini %50 indirimle satın alabilirsiniz!
					</div>
					<div>
						Promosyon kodu seçeneği aktifken Eco Fly paketi
						haricinde seçim yapılamamaktadır.
					</div>
				</div>
			</div>

			<FlightList
				:flights="flights"
				:has-promotion-code="hasPromotionCode"
			/>
		</v-container>

		<NotFound v-else />
	</div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useFlightStore } from "../stores/flights";
import FlightList from "../components/FlightListing/FlightList.vue";
import getSearchedFlights from "../module/FlightsBusiness";
import NotFound from "../components/NotFound/NotFound.vue";

export default {
	name: "FlightListingPage",
	components: {
		FlightList,
		NotFound,
	},
	data() {
		return {
			hasPromotionCode: false,
			hasError: false,
		};
	},
	created() {
		this.setPageTheme();

		this.checkFlightData();

		console.log(this.flights);
	},
	computed: {
		searchSummary() {
			if (
				this.$route.query.origin &&
				this.$route.query.destination &&
				this.$route.query.passengerNumber
			) {
				return `${this.capitalizeFirstLetter(
					this.$route.query.origin,
				)} - ${this.capitalizeFirstLetter(
					this.$route.query.destination,
				)}, ${this.$route.query.passengerNumber} Yolcu`;
			}

			return "";
		},
		...mapState(useFlightStore, ["flights"]),
	},
	methods: {
		checkFlightData() {
			if (
				!(
					this.flights &&
					Array.isArray(this.flights) &&
					this.flights.length > 0
				)
			) {
				this.getFlightDataWithUrlParams();
			}
		},
		getFlightDataWithUrlParams() {
			if (this.$route.query.origin && this.$route.query.destination) {
				const searchedFlights = getSearchedFlights(
					this.$route.query.origin,
					this.$route.query.destination,
				);

				if (this.validateSearchedFlights(searchedFlights)) {
					this.setFlights(searchedFlights);
				}
			}
		},
		validateSearchedFlights(searchedFlights) {
			if (Array.isArray(searchedFlights) && searchedFlights.length > 0) {
				return true;
			} else {
				this.hasError = true;
				return false;
			}
		},
		capitalizeFirstLetter(string) {
			const [first, ...rest] = string;
			return `${first.toLocaleUpperCase("tr")}${rest.join("")}`;
		},
		setPageTheme() {
			document.documentElement.className = "light-theme";
		},
		...mapActions(useFlightStore, ["setFlights"]),
	},
};
</script>

<style scoped>
.promotion-selector {
	display: flex;
	align-items: center;
}

.flight-not-avaliable {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 20px;
}
</style>
