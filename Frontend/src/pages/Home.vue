<template>
	<div>
		<div>
			<h2>Reviews</h2>
			<Review v-for="review in reviews" :key="review.id" :review="review" @onDelete="deleteReview" />
		</div>
		<h2>Create a Review</h2>
		<form @submit.prevent="createReview">
			<label for="title">Title:</label><br />
			<input type="text" id="title" name="title" v-model="title" required /><br />
			<label for="content">Content:</label><br />
			<textarea id="content" name="content" v-model="content" required></textarea><br />
			<input type="submit" value="Submit" />
		</form>
	</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from '../api';
import Review from '../components/Review.vue';

export default {
	components: {
		Review
	},
	setup() {
		const reviews = ref([]);
		const content = ref('');
		const title = ref('');

		const getReviews = () => {
			api.get('/api/reviews/')
				.then(res => res.data)
				.then(data => {
					reviews.value = data;
					console.log(data);
				})
				.catch(err => alert(err));
		};

		const deleteReview = id => {
			api.delete(`/api/reviews/delete/${id}/`)
				.then(res => {
					if (res.status === 204) alert('Review deleted!');
					else alert('Failed to delete review.');
					getReviews();
				})
				.catch(error => alert(error));
		};

		const createReview = e => {
			e.preventDefault();
			api.post('/api/reviews/', { content: content.value, title: title.value })
				.then(res => {
					if (res.status === 201) alert('Review created!');
					else alert('Failed to make review.');
					getReviews();
				})
				.catch(err => alert(err));
		};

		onMounted(() => {
			getReviews();
		});

		return {
			reviews,
			content,
			title,
			deleteReview,
			createReview
		};
	}
};
</script>

<style scoped>
/* Add your styles here */
</style>
