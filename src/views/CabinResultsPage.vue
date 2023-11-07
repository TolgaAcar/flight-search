<template>
	<div class="cabin-results">
		<v-container>
			<div class="cabin-results__message mb-10">
				<v-icon
					class="mr-10"
					size="x-large"
					:icon="cabinResultIconDetails.icon"
					:color="cabinResultIconDetails.color"
				/>

				<h3>{{ cabinResultMessage }}</h3>
			</div>

			<v-divider class="mb-10" />

			<div v-if="isFlightAvaliable" class="final-price-result">
				<h1 class="price-title">Toplam tutar</h1>

				<h2 class="price-amount">
					{{ flightTotalPriceText }}
				</h2>
			</div>

			<div v-else class="flight-not-avaliable">
				<v-btn variant="flat" color="#e81932" @click="returnHome"
					>Başa dön</v-btn
				>
			</div>
		</v-container>
	</div>
</template>

<script>
import { mapState } from "pinia";
import { useFlightStore } from "../stores/flights";

export default {
	name: "CabinResultsPage",
	created() {
		this.setPageTheme();
	},
	computed: {
		cabinResultMessage() {
			if (this.isFlightAvaliable) {
				return "Kabin seçiminiz tamamlandı.";
			} else {
				return "Kabin seçiminiz tamamlanamadı.";
			}
		},
		cabinResultIconDetails() {
			if (this.isFlightAvaliable) {
				return {
					icon: "mdi-check-circle",
					color: "#4CAF50",
				};
			} else {
				return {
					icon: "mdi-close-circle",
					color: "#e81932",
				};
			}
		},
		getPassengerNumberFromLocalStorage() {
			return localStorage.getItem("passengerNumber") || 1;
		},
		flightTotalPrice() {
			return this.flightPrice * this.getPassengerNumberFromLocalStorage;
		},
		flightTotalPriceText() {
			return `${this.flightPriceCurrency} ${this.flightTotalPrice}`;
		},
		...mapState(useFlightStore, [
			"isFlightAvaliable",
			"flightPrice",
			"flightPriceCurrency",
		]),
	},
	methods: {
		returnHome() {
			this.$router.push("/");
		},
		setPageTheme() {
			document.documentElement.className = "light-theme";
		},
	},
};
</script>

<style>
.cabin-results__message {
	display: flex;
	align-items: center;
}

.final-price-result {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.flight-not-avaliable {
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
</style>
