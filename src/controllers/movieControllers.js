const database = require("../../database");

const movies = [
	{
		id: 1,
		title: "Citizen Kane",
		director: "Orson Wells",
		year: "1941",
		color: false,
		duration: 120,
	},
	{
		id: 2,
		title: "The Godfather",
		director: "Francis Ford Coppola",
		year: "1972",
		color: true,
		duration: 180,
	},
	{
		id: 3,
		title: "Pulp Fiction",
		director: "Quentin Tarantino",
		year: "1994",
		color: true,
		duration: 180,
	},
];

const getMovies = (req, res) => {
	let sql = "select * from movies";
	const sqlValues = [];

	if (req.query.color != null) {
		sql += " where color = ?";
		sqlValues.push(req.query.color);

		if (req.query.max_duration != null) {
			sql += " where duration <= ?";
			sqlValues.push(req.query.max_duration);
		}
	} else if (req.query.max_duration != null) {
		sql += " where duration <= ?";
		sqlValues.push(req.query.max_duration);
	}

	database
		.query(sql, sqlValues)
		.then(([movies]) => {
			res.json(movies);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send("Error retrieving data from database");
		});
};

const getMovieById = (req, res) => {
	// biome-ignore lint/style/useNumberNamespace: <explanation>
	const id = parseInt(req.params.id, 10);

	const movie = movies.find((movie) => movie.id === id);

	if (movie != null) {
		res.json(movie);
	} else {
		res.status(404).send("Not Found");
	}
};

const postMovie = (req, res) => {
	console.log(req.body);
	const { title, director, year, color, duration } = req.body;
	res.send("Post route is working");

	database
		.query(
			"INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
			[title, director, year, color, duration],
		)
		.then(([result]) => {
			res.status(200).send({ id: result.insertId });
		})
		.catch((err) => {
			console.error(err);
			res.sendStatus(500);
		});
};

module.exports = {
	getMovies,
	getMovieById,
	postMovie,
};
