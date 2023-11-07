<template>
	<div class="flight-search">
		<div class="welcoming-text mb-10">
			<h1 class="welcoming-title">Merhaba</h1>

			<h2 class="welcoming-subtitle">Nereyi keşfetmek istersiniz ?</h2>
		</div>

		<FlightSearchFilter @on-search-click="searchFlights" />

		<FlightErrorModal
			v-if="showErrorModal"
			:error-text="errorText"
			@on-close-modal="closeErrorModal"
		/>
	</div>
</template>

<script>
import FlightErrorModal from "../components/FlightErrorModal/FlightErrorModal.vue";
import FlightSearchFilter from "../components/FlightSearch/FlightSearchFilter.vue";
import { ErrorTypes } from "../components/FlightErrorModal/ErrorTypes";
import getSearchedFlights from "../module/FlightsBusiness";
import { mapActions, mapState } from "pinia";
import { useFlightStore } from "../stores/flights";

export default {
	name: "FlightSearch",
	components: {
		FlightSearchFilter,
		FlightErrorModal,
	},
	data() {
		return {
			filterData: null,
			showErrorModal: false,
			errorText: "",
		};
	},
	created() {
		this.setPageTheme();
	},
	methods: {
		setPageTheme() {
			document.documentElement.className = "dark-theme";
		},
		searchFlights(searchData) {
			if (this.validateSearchData(searchData)) {
				const searchedFlights = getSearchedFlights(
					searchData.origin,
					searchData.destination,
				);

				if (this.validateSearchedFlights(searchedFlights)) {
					this.setFlights(searchedFlights);

					this.setPassengerNumberToLocalStorage(
						searchData.passengerNumber,
					);

					this.$router.push({
						path: "/flight-list",
						query: {
							origin: searchData.origin,
							destination: searchData.destination,
							flightClass: searchData.flightClass,
							passengerNumber: searchData.passengerNumber,
						},
					});
				}
			}
		},
		closeErrorModal() {
			this.showErrorModal = false;
		},
		validateSearchData(searchData) {
			if (searchData?.origin === "") {
				this.errorText = ErrorTypes.emptyOrigin;
				this.showErrorModal = true;
				return false;
			} else if (searchData.destination === "") {
				this.errorText = ErrorTypes.emptyDestination;
				this.showErrorModal = true;
				return false;
			} else {
				this.showErrorModal = false;
				return true;
			}
		},
		validateSearchedFlights(searchedFlights) {
			if (Array.isArray(searchedFlights) && searchedFlights.length > 0) {
				return true;
			} else {
				this.errorText = ErrorTypes.flightNotFound;
				this.showErrorModal = true;
				return false;
			}
		},
		setPassengerNumberToLocalStorage(passNumber) {
			localStorage.setItem("passengerNumber", passNumber);
		},
		...mapActions(useFlightStore, ["setFlights"]),
	},
	computed: {
		...mapState(useFlightStore, ["getFlights"]),
	},
};
</script>

<style scoped>
.welcoming-text {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: var(--text-primary-color);
}
</style>
