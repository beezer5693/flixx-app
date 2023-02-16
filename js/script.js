const global = {
	currentPage: window.location.pathname
};

// Create movie card
const createMovieCard = ({ id, title, poster_path, release_date }) => {
	const div = document.createElement('div');
	div.classList.add('card');
	div.innerHTML = `
	<a href="movie-details.html?id=${id}">
		${
			poster_path
				? `<img src="https://image.tmdb.org/t/p/w500${poster_path}" class="card-img-top" alt=${title} />`
				: `<img src="images/no-image.jpg" class="card-img-top" alt=${title} />`
		}
	</a>
	<div class="card-body">
		<h5 class="card-title">${title}</h5>
		<p class="card-text">
			<small class="text-muted">Release: ${release_date}</small>
		</p>
	</div>
	`;

	document.querySelector('#popular-movies').appendChild(div);
};

// Display popular movies
const displayPopularMovies = async () => {
	const { results } = await fetchAPIData('movie/popular');
	console.log(results);
	results.forEach(movie => {
		createMovieCard(movie);
	});
};

// Fetch data from TMDB API
const fetchAPIData = async endpoint => {
	const API_KEY = '42c7c5cf298f2b3b5781578224f3c904';
	const API_URL = 'https://api.themoviedb.org/3/';

	const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}`);
	const data = await response.json();

	return data;
};

// Highlight active link
const highlightActiveLink = () => {
	const links = document.querySelectorAll('.nav-link');
	links.forEach(link => {
		if (link.getAttribute('href') === global.currentPage) {
			link.classList.add('active');
		}
	});
};

// Init app
const init = () => {
	switch (global.currentPage) {
		case '/':
		case '/index.html':
			displayPopularMovies();
			break;
		case '/shows.html':
			console.log('shows');
			break;
		case '/movie-details.html':
			console.log('movie details');
			break;
		case '/tv-details.html':
			console.log('tv details');
			break;
		case '/search.html':
			console.log('search');
			break;
	}

	highlightActiveLink();
};

document.addEventListener('DOMContentLoaded', init);
