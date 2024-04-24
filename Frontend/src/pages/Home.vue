<template>
	<div>
		<div>
			<h2 class="reviews-title">Your Movie Reviews</h2>
			<Review v-for="review in reviews" :key="review.id" :review="review" :onDelete="deleteReview" />
		</div>
		<h2 class="reviews-title">Create a Review</h2>
		<form @submit.prevent="createReview">
			<label for="title">Title:</label>
			<br />
			<input class="review-input" type="text" id="title" name="title"
			v-model="title" required />
			<br />
			<label for="title">Movie name:</label>
			<br />
			<input class="review-input" type="text" id="movie" name="movie"
			v-model="movie" required />
			<br />
			<label for="content">Content:</label>
			<br />
			<textarea class="review-input content-textarea" id="content"
			name="content" v-model="content" required></textarea>
			<br />
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
		const movie = ref('')

		// get all the reviews for the current user
		const getReviews = () => {
			api.get('/api/reviews/')
				.then(res => res.data)
				.then(data => {
					reviews.value = data;
					console.log(data);
				})
				.catch(err => alert(err));
		};

		// delete the selected review
		const deleteReview = id => {
			api.delete(`/api/reviews/delete/${id}/`)
				.then(res => {
					if (res.status === 204) alert('Review deleted!');
					else alert('Failed to delete review.');
					getReviews();
				})
				.catch(error => alert(error));
		};

		// add the review to the database
		const createReview = e => {
			e.preventDefault();
			api.post('/api/reviews/', { content: content.value, title: title.value, movie: movie.value})
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
			movie,
			deleteReview,
			createReview
		};
	}
};
</script>

<style>

	.reviews-title {
		display: flex;
		justify-content: center;
	}

	.review-input {
		width: 100%;
	}

	.content-textarea {
		min-height: 100px;
	}

</style>
