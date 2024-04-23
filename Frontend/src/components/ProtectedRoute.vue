<template>
	<div v-if="isAuthorized">HOME</div>
	<div v-else>Loading...</div>
</template>
  
<script>
	import { useRoute, useRouter } from 'vue-router';
	import VueJwtDecode from 'vue-jwt-decode';
	import api from '../api';
	import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';
	import { ref, onMounted } from 'vue';

	export default {
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
				console.log('Token:', token);
				if (!token) {
					isAuthorized.value = false;
					return;
				}
				try {
					const decoded = VueJwtDecode.decode(token);
					console.log('Decoded token:', decoded);
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
				} catch (error) {
					console.log('Error decoding token:', error);
					isAuthorized.value = false;
				}
			};

			onMounted(async () => {
				await auth();
			});

			return { isAuthorized };
		},
	};
</script>
