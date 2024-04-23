<template>
	<form @submit.prevent="handleSubmit" class="login-form">
		<h3 class="login-text">Login</h3>

		<div class="form-group">
			<label class="form-label">Username</label>
			<input type="text" class="form-control" v-model="username" placeholder="Username"/>
		</div>

		<div class="form-group">
			<label class="form-label">Password</label>
			<input type="password" class="form-control" v-model="password" placeholder="Password"/>
		</div>

		<button type="submit" class="btn btn-primary btn-block">Login</button>
	</form>
</template>

<script>
	import { useRouter } from 'vue-router';
	import api from "../api";
	import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

	export default {
		name: 'Login',

		data() {
			return {
				username: '',
				password: ''
			}
		},

		methods: {
			async handleSubmit() {
				try {
					const data = {
						username: this.username,
						password: this.password,
					};

					// Make the API call
					const response = await api.post('/api/token/', data);

					// Handle response
					const access_token = response.data.access;
					const refresh_token = response.data.refresh;

					// Store tokens locally
					localStorage.setItem(ACCESS_TOKEN, access_token);
					localStorage.setItem(REFRESH_TOKEN, refresh_token);

					// Redirect user to home page
					this.$router.push('/');
				} catch (error) {
					console.error("Error:", error.message);
					// Handle error, show error message to the user, etc.
				}
			}
		}
	}
</script>
