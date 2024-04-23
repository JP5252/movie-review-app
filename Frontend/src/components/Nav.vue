<script>
	export default {
		name: 'Nav'
	}
</script>

<template>
	<nav class="navbar navbar-expand navbar-light fixed-top">
		<div class="container">
			<router-link to="/" class="navbar-brand">Movie Reviews</router-link>
			<div class="collapse navbar-collapse justify-content-end">
				<ul class="navbar-nav ml-auto">
					<li class="nav-item">
						<router-link to="/login" class="nav-link">Login</router-link>
					</li>
					<li class="nav-item">
						<router-link to="/register" class="nav-link">Sign Up</router-link>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>