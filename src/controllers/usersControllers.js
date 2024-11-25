const users = [
	{
		id: 1,
		firstname: "John",
		lastname: "Doe",
		email: "john.doe@example.com",
		city: "Paris",
		language: "English",
	},
	{
		id: 2,
		firstname: "Valeriy",
		lastname: "Appius",
		email: "valeriy.appius@example.com",
		city: "Moscow",
		language: "Russian",
	},
	{
		id: 3,
		firstname: "Ralf",
		lestname: "Geronimo",
		email: "ralf.geronimo@example.com",
		city: "New York",
		language: "Italian",
	},
];

const getUsers = (req, res) => {
	res.json(users);
};

const getUsersById = (req, res) => {
	const id = parseInt(req.params.id);

	const user = users.find((user) => user.id === id);

	if (user != null) {
		res.json(user);
	} else {
		res.status(404).send("Not Found");
	}
};

module.exports = {
	getUsers,
	getUsersById,
};
