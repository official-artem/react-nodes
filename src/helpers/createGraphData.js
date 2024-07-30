export function createGraphData(heroData, movies, starships) {
	if (!heroData || !movies || !starships) return;

	const nodes = [
		{
			id: `hero-${heroData.id}`,
			type: 'custom',
			targetPosition: 'bottom',
			data: { label: heroData.name },
			position: { x: 250, y: 25 },
		},
		...movies.map((movie, index) => ({
			id: `movie-${movie.id}`,
			type: 'custom',
			targetPosition: 'top',
			data: { label: movie.title },
			position: { x: 100 * (index * 1.5), y: 100 },
		})),
		...starships.map((ship, index) => ({
			id: `ship-${ship.id}`,
			type: 'custom',
			data: { label: ship.name },
			position: { x: 100 * (index * 1.5), y: 200 },
		})),
	];

	const edges = [
		...movies.map(movie => ({
			id: `edge-hero-movie-${movie.id}`,
			type: `customEdge-${movie.id}`,
			source: `hero-${heroData.id}`,
			target: `movie-${movie.id}`,
		})),
		...movies.flatMap(movie =>
			movie.starships.map(starshipUrl => {
				const ship = starships.find(starship => starship.id === starshipUrl);

				return ship ? {
					id: `edge-movie-ship-${ movie.id }-${ ship.id }`,
					source: `movie-${ movie.id }`,
					target: `ship-${ ship.id }`,
				} : null;
			}).filter(edge => edge !== null)
		),
	];

	return { nodes, edges };
};