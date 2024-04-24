<template>
	<form @submit.prevent="handleSubmit">
		<h3>Sign Up</h3>

		<p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>

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

		<button class="btn btn-primary btn-block">Sign Up<router-link to="/" class="navbar-brand"></router-link></button>
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
				password_confirm: '',
				errorMessage: ''
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

					// check data
					console.log(data); 

					// make the api call
					const response = await api.post('/api/user/register/', data);

					// check response
					console.log(response.data); 
					
					this.$router.push('/login');
				} catch (error) {
					console.error("Error:", error.message);
					this.errorMessage = "There was a problem with you username and/or password. Please try again.";
				}
			}
		}
	}
</script>