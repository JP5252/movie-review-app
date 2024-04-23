<template>
	<div>
		<Nav />

		<div class="auth-wrapper">
			<div class="auth-inner">
				<router-view />
			</div>
  		</div>
	</div>
</template>

<script>
	import Nav from '@/components/Nav.vue'

	name: 'App'
export default {
	components:{
		Nav
	}
}
</script>

<style>
	@import url('https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800');

	body {
		background: #b3b4bd !important;
		min-height: 100vh;
		display: flex;
		font-weight: 400;
		font-family: 'Fira Sans', sans-serif;
		}

	h1, h2, h3, h4, h5, h6, label, span {
		font-weight: 400;
		font-family: 'Fira Sans', sans-serif;
	}

	body, html, #app, #root, .auth-wrapper {
		width: 100%;
		height: 100%;
	}

	#app {
		text-align: center;
	}

	.navbar-light {
		background-color: #2c2e3a;
		box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
	}

	.nav-link,
	.navbar-brand {
		color: #b3b4bd;
	}
	
	.nav-link {
		font-size: 20px;
	}

	.auth-wrapper {
		display: flex;
		justify-content: center;
		flex-direction: column;
		text-align: left;
		padding-top: 10%;
	}

	.auth-inner {
		width: 450px;
		margin:  auto;
		background: #ffffff;
		box-shadow: 0 14px 80px rgba(34, 35, 58, 0.2);
		padding: 40px 55px 45px 55px;
		border-radius: 15px;
		transition: all .3s;
	}

	.auth-wrapper .form-control:focus {
		border-color: #167bff;
		box-shadow: none;
	}

	.auth-wrapper h3{
		text-align: center;
		margin: 0;
		line-height: 1;
		padding-bottom: 20px;
	}

	.custom-control-label {
		font-weight: 400;
	}

	.forgot-password,
	.forgot-password a {
		text-align: right;
		font-size: 13px;
		padding-top: 10px;
		color: #7f7f7f;
		margin: 0;
	}

	.forgot-password a {
		color: #167bff;
	}

	.login-form {
		background-color: #ffffff;
		border-radius: 10px;
		padding: 0 5px 5px 5px;
	}

	.form-group {
		padding: 5px;
	}

	.login-text,
	.form-label {
		color: #000000;
	}

	.login-text {
		padding-top: 5px;
	}

	.btn {
		width: 100%;
		justify-content: center;
		margin-top: 5px;
	}

</style>
