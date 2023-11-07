<template>
	<div class="flight-search-filter pa-5">
		<div class="ports-filters">
			<div>
				<v-text-field
					class="custom-text-field pa-2"
					v-model="origin"
					prepend-inner-icon="mdi-airplane-takeoff"
					variant="plain"
					placeholder="Nereden"
					hide-details="auto"
					density="compact"
				/>
			</div>
			<div>
				<v-text-field
					class="pa-2"
					v-model="destination"
					prepend-inner-icon="mdi-airplane-landing"
					variant="plain"
					placeholder="Nereye"
					hide-details="auto"
					density="compact"
				/>
			</div>
		</div>

		<div class="date-cabin-filters">
			<div class="date-filter pa-2">
				<div class="date-filter__title">Tarih</div>
				<div class="date-filter__icon">
					<v-icon icon="mdi-calendar-month" />
				</div>
			</div>

			<v-menu v-model="isCabinMenuOpen" :close-on-content-click="false">
				<template v-slot:activator="{ props }">
					<div v-bind="props" class="cabin-filter-activator pa-2">
						<div class="passenger-number">
							{{ passengerNumber }}
						</div>
						<div class="passenger-icon">
							<v-icon :icon="passengerIcon" />
							<span v-if="passengerNumber > 3">+</span>
						</div>
					</div>
				</template>

				<v-card min-width="300" class="cabin-card pa-4 mt-3">
					<h4 class="cabin-card-title mb-3">Kabin ve yolcu seçimi</h4>
					<div class="cabin-card-details">
						<div class="cabin-type mb-7">
							<v-radio-group
								v-model="flightClass"
								inline
								color="blue-darken-1"
								hide-details="auto"
							>
								<v-radio
									label="Economy Class"
									value="economy"
								/>
								<v-radio
									label="Business Class"
									value="business"
								/>
							</v-radio-group>
						</div>

						<div class="passenger-type mb-4">
							<h4 class="passenger-title">Yolcu</h4>

							<div class="passenger-counter">
								<v-btn
									icon="mdi-minus"
									size="small"
									color="blue-grey-lighten-4"
									@click="decrementPassengerNumber"
								/>
								<div class="passenger-number">
									{{ passengerNumber }}
								</div>
								<v-btn
									icon="mdi-plus"
									size="small"
									color="blue-grey-lighten-4"
									@click="incrementPassengerNumber"
								/>
							</div>
						</div>
					</div>
				</v-card>
			</v-menu>
		</div>

		<div class="search-flight-button" @click="handleSearchClick">
			<v-icon icon="mdi-chevron-right" size="x-large" />
		</div>
	</div>
</template>

<script>
export default {
	name: "FlightSearchFilter",
	emits: ["onSearchClick"],
	data() {
		return {
			origin: "",
			destination: "",
			flightClass: "economy",
			passengerNumber: 1,
			date: null,
			isCabinMenuOpen: false,
		};
	},
	methods: {
		decrementPassengerNumber() {
			if (this.passengerNumber > 1) {
				this.passengerNumber--;
			}
		},
		incrementPassengerNumber() {
			if (this.passengerNumber < 9) {
				this.passengerNumber++;
			}
		},
		handleSearchClick() {
			const searchData = {
				origin: this.origin,
				destination: this.destination,
				flightClass: this.flightClass,
				passengerNumber: this.passengerNumber,
			};

			this.$emit("onSearchClick", searchData);
		},
	},
	computed: {
		passengerIcon() {
			if (this.passengerNumber === 1) {
				return "mdi-human-male";
			} else if (this.passengerNumber === 2) {
				return "mdi-human-male-male";
			} else {
				return "mdi-human-queue";
			}
		},
	},
};
</script>

<style scoped>
.flight-search-filter {
	display: flex;
	margin: auto;
	max-width: 800px;
	height: 100px;
	gap: 5px;
	background-color: var(--background-color-secondary);
	align-items: center;
}

.ports-filters {
	display: flex;
	flex-grow: 2;
	gap: 5px;
}

.ports-filters > div {
	flex-grow: 1;
	background-color: white;
}

:deep(input) {
	color: var(--accent-color);
}

.date-cabin-filters {
	display: flex;
	flex-grow: 1;
	gap: 5px;
	height: 100%;
	color: var(--text-primary-color);
}

.date-cabin-filters > div {
	display: flex;
	align-items: center;
	flex: 1;
	background-color: var(--filter-background-color);
	width: 100%;
	justify-content: space-around;
}

.passenger-icon {
	min-width: 40px;
}

.passenger-type {
	display: flex;
	justify-content: space-between;
}

.passenger-counter {
	display: flex;
	align-items: center;
	gap: 10px;
}

.v-btn--icon {
	border-radius: 0 !important;
}

.search-flight-button {
	background-color: var(--red-background-color);
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	color: var(--text-primary-color);
}

:deep(.v-field__input),
:deep(.v-field__prepend-inner) {
	color: var(--accent-color) !important;
}
</style>
