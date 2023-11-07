<template>
	<v-container class="flight-item" :fluid="true">
		<v-row class="flight-item-row" no-gutters>
			<v-col class="flight-details">
				<v-sheet class="flight-sheet pa-6">
					<div class="origin">
						<h2>{{ flightDetails.departureDateTimeDisplay }}</h2>
						<h4>{{ flightDetails.originAirport.city.code }}</h4>
						<h4>{{ flightDetails.originAirport.city.name }}</h4>
					</div>
					<v-divider class="mx-3" :thickness="3" />
					<div class="destination">
						<h2>{{ flightDetails.arrivalDateTimeDisplay }}</h2>
						<h4>
							{{ flightDetails.destinationAirport.city.code }}
						</h4>
						<h4>
							{{ flightDetails.destinationAirport.city.name }}
						</h4>
					</div>

					<div class="flight-duration ml-7">
						<h5 class="duration-title">Uçuş süresi</h5>
						<h4 class="duration-value">
							{{ flightDetails.flightDuration }}
						</h4>
					</div>
				</v-sheet>
			</v-col>

			<v-col cols="3" class="cabin economy-cabin">
				<v-sheet class="pa-6" @click="setCabinType('ECONOMY')">
					<v-icon
						:color="cabinType === 'ECONOMY' ? 'blue-darken-1' : ''"
						:icon="
							cabinType === 'ECONOMY'
								? 'mdi-radiobox-marked'
								: 'mdi-radiobox-blank'
						"
						size="large"
					/>

					<h4 class="cabin-title">Economy</h4>

					<v-spacer />

					<div class="pricing">
						<h5 class="pricing-text">Yolcu başına</h5>

						<h4 class="price">{{ getPrice("ECONOMY") }}</h4>
					</div>
				</v-sheet>
			</v-col>

			<v-col cols="3" class="cabin business-cabin">
				<v-sheet class="pa-6" @click="setCabinType('BUSINESS')">
					<v-icon
						:color="cabinType === 'BUSINESS' ? 'blue-darken-1' : ''"
						:icon="
							cabinType === 'BUSINESS'
								? 'mdi-radiobox-marked'
								: 'mdi-radiobox-blank'
						"
						size="large"
					/>

					<h4 class="cabin-title">Business</h4>

					<v-spacer />

					<div class="pricing">
						<h5 class="pricing-text">Yolcu başına</h5>

						<h4 class="price">{{ getPrice("BUSINESS") }}</h4>
					</div>
				</v-sheet>
			</v-col>
		</v-row>
	</v-container>

	<v-container v-if="cabinType">
		<v-row>
			<v-col
				cols="4"
				v-for="(cabin, index) in cabinFareCategoriesDetails"
				:key="`cpc-${index}`"
			>
				<CabinPriceCard
					:cabin-details="cabin"
					:has-promotion-code="hasPromotionCode"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import CabinPriceCard from "./CabinPriceCard.vue";
export default {
	name: "FlightItem",
	components: {
		CabinPriceCard,
	},
	props: {
		flightDetails: {
			type: Object,
			default: () => ({}),
		},
		hasPromotionCode: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			cabinType: "",
		};
	},
	computed: {
		cabinFareCategoriesDetails() {
			return this.cabinType
				? this.flightDetails.fareCategories[this.cabinType]
						.subcategories
				: [];
		},
	},
	methods: {
		setCabinType(type) {
			this.cabinType = type;
		},
		getPrice(type) {
			return `${
				this.flightDetails.fareCategories[type].subcategories[0].price
					.currency
			} ${
				this.hasPromotionCode
					? this.flightDetails.fareCategories[type].subcategories[0]
							.price.amount / 2
					: this.flightDetails.fareCategories[type].subcategories[0]
							.price.amount
			}`;
		},
	},
};
</script>

<style>
.flight-item {
	display: flex;
}

.flight-item h4,
.flight-item h5 {
	color: var(--title-primary-color);
}

.flight-item-row {
	gap: 10px;
	overflow-x: auto;
	flex-wrap: nowrap;
}

.flight-sheet {
	height: 100%;
	display: flex !important;
	align-items: center;
	justify-content: space-between;
}

.destination {
	text-align: end;
}

.flight-duration {
	width: 200px;
	text-align: center;
}

.duration-title {
	color: var(--title-primary-color);
}

.duration-value {
	color: var(--title-secondary-color) !important;
}

.cabin > .v-sheet {
	height: 100%;
	display: flex;
	align-items: center;
	gap: 10px;
}

.price {
	color: var(--title-secondary-color) !important;
}
</style>
