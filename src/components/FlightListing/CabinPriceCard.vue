<template>
	<v-sheet class="cabin-price-card">
		<div>
			<div class="card-title pa-6">
				<h3 class="cabin-name">{{ cabinDetails.brandCode }}</h3>

				<h3 class="cabin-price">{{ cabinPriceText }}</h3>
			</div>

			<div class="cabin-rights pb-6">
				<div class="cabin-rights-list">
					<div
						class="cabin-rights-item"
						v-for="(right, index) in cabinDetails.rights"
					>
						<div class="px-6 py-3">{{ right }}</div>

						<v-divider />
					</div>
				</div>
			</div>
		</div>

		<div
			class="cabin-selector pa-3"
			:class="{ disabled: isCabinCardDisable }"
			@click="selectFlight"
		>
			Uçuşunu seç
		</div>
	</v-sheet>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useFlightStore } from "../../stores/flights";

export default {
	name: "CabinPriceCard",
	props: {
		cabinDetails: {
			type: Object,
			default: () => ({}),
		},
		hasPromotionCode: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		cabinPrice() {
			let price = this.cabinDetails.price.amount;
			if (
				this.cabinDetails.brandCode === "ecoFly" &&
				this.hasPromotionCode
			) {
				price = price / 2;
			}
			return price;
		},
		cabinCurrency() {
			return this.cabinDetails.price.currency;
		},
		cabinPriceText() {
			return `${this.cabinCurrency} ${this.cabinPrice}`;
		},
		isCabinCardDisable() {
			return (
				this.cabinDetails.brandCode !== "ecoFly" &&
				this.hasPromotionCode
			);
		},
	},
	methods: {
		selectFlight() {
			if (!this.isCabinCardDisable) {
				if (this.cabinDetails.status === "AVAILABLE") {
					this.setIsFlightAvaliable(true);
					this.setFlightPrice(this.cabinPrice);
					this.setFlightPriceCurrency(this.cabinCurrency);
				} else {
					this.setIsFlightAvaliable(false);
				}

				this.$router.push("cabin-results");
			}
		},
		...mapActions(useFlightStore, [
			"setIsFlightAvaliable",
			"setFlightPrice",
			"setFlightPriceCurrency",
		]),
	},
};
</script>

<style>
.cabin-price-card {
	height: 100%;
	min-height: 450px;
	display: flex !important;
	flex-direction: column;
	justify-content: space-between;
}

.card-title {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: var(--accent-color);
}

.cabin-selector {
	text-align: center;
	background-color: #e81932;
	color: white;
}

.disabled {
	background-color: grey;
}
</style>
