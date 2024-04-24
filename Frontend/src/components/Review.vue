<!-- Review component that is called to display a review -->
<template>
	<div class="review-container">
		<p class="review-title">{{ review.title }}</p>
		<p class="review-movie">{{ review.movie }}</p>
		<p class="review-content">{{ review.content }}</p>	
		<p class="review-date">{{ formattedDate }}</p>
		<button class="delete-button" @click="handleDelete">
			Delete
		</button>
	</div>
</template>

<script>
	export default {
		props: {
			review: {
				type: Object,
				required: true
			},
			onDelete: {
				type: Function,
				required: true
			}
		},
		data() {
			return {
				formattedDate: ''
			};
		},
		mounted() {
			this.formattedDate = new Date(this.review.created_at).toLocaleDateString('en-US');
		},
		methods: {
			handleDelete() {
				this.onDelete(this.review.id);
			}
		}
};
</script>

<style>
	.review-container {
		padding: 10px;
		margin: 20px 0;
		border: 1px solid #ccc;
		border-radius: 5px;
	}

	.review-title {
		color: #333;
	}

	.review-content {
		color: #666;
	}

	.review-date {
		color: #999;
		font-size: 0.8rem;
	}

	.delete-button {
		background-color: #f44336; /* Red */
		color: white;
		border: none;
		padding: 10px 20px;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	.delete-button:hover {
		background-color: #d32f2f; /* Darker red */
	}
</style>
