<template>
	<v-dialog v-model="showModal" persistent width="auto">
		<v-card class="pa-10">
			<v-card-title class="text-h5">
				{{ errorText }}
			</v-card-title>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn variant="flat" color="red" @click="handleCloseClick">
					Kapat
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: "FlightErrorModal",
	emits: ["onCloseModal"],
	props: {
		errorText: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			showModal: true,
		};
	},
	methods: {
		handleCloseClick() {
			this.$emit("onCloseModal");
		},
	},
};
</script>

<style></style>
