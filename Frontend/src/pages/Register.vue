<template>
	<form @submit.prevent="handleSubmit">
		<h3>Sign Up</h3>

		<div class="form-group">
			<label>Username</label>
			<input type="text" class="form-control" v-model="username" placeholder="Username"/>
		</div>

		<div class="form-group">
			<label>Password</label>
			<input type="password" class="form-control" v-model="password" placeholder="Password"/>
		</div>
		
		<div class="form-group">
			<label>Confirm Password</label>
			<input type="password" class="form-control" v-model="password_confirm" placeholder="Confirm Password"/>
		</div>

		<button class="btn btn-primary btn-block">Sign Up</button>
	</form>
</template>

<script>
import { useRouter } from 'vue-router';

import api from "../api";

	export default {
		name: 'Register',

		data() {
			return {
				username: '',
				password: '',
				password_confirm: ''
			}
		},

		methods: {
		async handleSubmit() {
			try {
				// check if the password and the confirmation match
				if (this.password !== this.password_confirm) {
					throw new Error("Passwords do not match");
				}

				const data = {
					username: this.username,
					password: this.password,
				};

				// make the api call
				const response = await api.post('/api/user/register/', data);

				// Handle response
				console.log(response.data); // Assuming your API returns some data

				// Redirect to home page after successful registration
				const router = useRouter();
				router.push('/');
			} catch (error) {
				console.error("Error:", error.message);
				// Handle error, show error message to the user, etc.
			}
		}
	}
	}
</script>