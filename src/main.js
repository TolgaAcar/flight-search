import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// Pinia
import { createPinia } from "pinia";
const pinia = createPinia();

// router
import router from "./router";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";
import "./style.css";

const vuetify = createVuetify({
	components,
	directives,
	icons: {
		defaultSet: "mdi",
	},
});

createApp(App).use(vuetify).use(router).use(pinia).mount("#app");
