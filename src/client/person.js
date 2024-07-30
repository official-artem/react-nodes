import axios from 'axios';
const HERO_URI = process.env.NEXT_PUBLIC_API_URI + '/people';
const FILMS_URI = process.env.NEXT_PUBLIC_API_URI + '/films';
const STARSHIPS_URI = process.env.NEXT_PUBLIC_API_URI + '/starships';

export async function getDetails(personId) {
	const hero = await axios.get(`${HERO_URI}/${personId}`);
	const heroInfo = hero.data;

	const filmsResponse = await axios.get(FILMS_URI);
	const allFilms = filmsResponse.data.results;

	const allStarships = await getAllStarships()

	const movies = allFilms.filter(film => heroInfo.films.includes(film.id));

	const sortedStarships = movies.reduce((acc, movie) => {
		const updatedData = [...acc];
		const updatedMovie = { id: movie.id, starships: [] };

		for (const starshipId of movie.starships) {
			if (heroInfo.starships.includes(starshipId)) {
				const starship = allStarships.find(starship => {
					return starship.id === starshipId;
				});
				updatedMovie.starships.push(starship);
			}
		}

		updatedData.push(updatedMovie);
		return updatedData;
	}, []);

	const starships = sortedStarships.flatMap(movie => movie.starships);

	return { heroInfo, movies, starships };
};

async function getAllStarships() {
	let starships = [];
	let nextPage = STARSHIPS_URI;

	while (nextPage) {
		const response = await axios.get(nextPage);
		starships = [...starships, ...response.data.results];
		nextPage = response.data.next;
	}

	return starships;
}