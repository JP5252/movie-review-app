<template>
	<div v-if="isAuthorized"> <Home /></div>
	<div v-else>Loading...</div>
</template>
  
<script>
	import { useRoute, useRouter } from 'vue-router';
	import { jwtDecode } from 'jwt-decode';
	import api from '../api';
	import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';
	import { ref, onMounted } from 'vue';
	import Home from '../pages/Home.vue';

	export default {
		components: {
		Home
		},
		setup() {
			const isAuthorized = ref(null);
			const route = useRoute();
			const router = useRouter();

			const refreshToken = async () => {
			const refreshToken = localStorage.getItem(REFRESH_TOKEN);
			try {
				const res = await api.post('/api/token/refresh/', {
				refresh: refreshToken,
				});
				if (res.status === 200) {
				localStorage.setItem(ACCESS_TOKEN, res.data.access);
				isAuthorized.value = true;
				} else {
				isAuthorized.value = false;
				}
			} catch (error) {
				console.log(error);
				isAuthorized.value = false;
			}
			};

			const auth = async () => {
			const token = localStorage.getItem(ACCESS_TOKEN);
			if (!token) {
				isAuthorized.value = false;
				return;
			}
			const decoded = jwtDecode(token);
			const tokenExpiration = decoded.exp;
			const now = Date.now() / 1000;

			console.log('Token expiration:', tokenExpiration);
			console.log('Current time:', now);

			if (tokenExpiration < now) {
				console.log('Token expired. Refreshing token...');
				await refreshToken();
			} else {
				console.log('Token still valid.');
				isAuthorized.value = true;
			}
			};

			onMounted(async () => {
			await auth();
			});

			return { isAuthorized };
		},
	};
</script>