import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import NotFound from "@/pages/NotFound.vue"

const routes = [
	{ path: "/", component: Home },
	{ path: "/login", component: Login },
	{ path: "/register", component: Register },
	{ path: "/not-found", component: NotFound},
	// catch all for not found pages
	{ path: "/:catchAll(.*)", redirect: "/not-found" }
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;