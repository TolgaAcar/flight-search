<template>
	<v-container class="flight-not-avaliable">
		<h4>{{ textMessage }}</h4>

		<v-btn variant="flat" color="#e81932" @click="returnHome">
			Başa dön
		</v-btn>
	</v-container>
</template>

<script>
export default {
	name: "NotFound",
	props: {
		textMessage: {
			type: String,
			default: "Aradığınız kriterlere uygun uçuş bulunamadı",
		},
	},
	methods: {
		returnHome() {
			this.$router.push("/");
		},
	},
};
</script>

<style>
.flight-not-avaliable {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 20px;
}
</style>
