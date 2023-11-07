import { createWebHistory, createRouter } from "vue-router";
import FlightSearch from "../views/FlightSearch.vue";
import FlightListingPage from "../views/FlightListingPage.vue";
import CabinResultsPage from "../views/CabinResultsPage.vue";
import NotFoundPage from "../views/NotFoundPage.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: FlightSearch,
	},
	{
		path: "/flight-list",
		name: "FlightList",
		component: FlightListingPage,
	},
	{
		path: "/cabin-results",
		name: "CabinResults",
		component: CabinResultsPage,
	},
	{
		path: "/:pathMatch(.*)*",
		component: NotFoundPage,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
