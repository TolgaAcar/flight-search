<template>
	<div class="header mb-10">
		<div class="left-module" @click="returnHome">
			<p>turkishairlines.com</p>
		</div>
		<div class="right-module">
			<p>search<b>Flight Challenge</b></p>
		</div>
	</div>
</template>

<script>
export default {
	name: "Header",
	methods: {
		returnHome() {
			this.$router.push("/");
		},
	},
};
</script>

<style scoped>
.header {
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #aaa;
	color: var(--text-primary-color);
}
</style>
