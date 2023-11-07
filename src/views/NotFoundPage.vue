<template>
	<NotFound :textMessage="message" />
</template>

<script>
import NotFound from "../components/NotFound/NotFound.vue";
export default {
	name: "NotFoundPage",
	components: {
		NotFound,
	},
	data() {
		return {
			message: "Aradığınız sayfa bulunamadı.",
		};
	},
};
</script>
