<script>
	export default {
		name: 'Login'
	}
</script>

<template>
	<form class="login-form">
		<h3 class="login-text">Login</h3>

		<div class="form-group">
			<label class="form-label">Username</label>
			<input type="text" class="form-control" placeholder="Username"/>
		</div>

		<div class="form-group">
			<label class="form-label">Password</label>
			<input type="password" class="form-control" placeholder="Password"/>
		</div>

		<button class="btn btn-primary btn-block">Login</button>
	</form>
</template>