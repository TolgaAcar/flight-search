<template>
	<div class="app pa-6">
		<Header />
		<router-view />
	</div>
</template>

<script>
import Header from "./components/Header/Header.vue";
export default {
	name: "App",
	components: { Header },
};
</script>

<style>
.app {
	background-color: var(--background-color-primary);
	height: 100vh;
	width: 100vw;
}
</style>
