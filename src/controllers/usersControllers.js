// Import de la base de données
const database = require("../../database");

// Données fictives d'utilisateurs
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
		lastname: "Geronimo",
		email: "ralf.geronimo@example.com",
		city: "New York",
		language: "Italian",
	},
];

// Route pour récupérer tous les utilisateurs ou les filtrer selon des paramètres
const getUsers = (req, res) => {
	// Récupérer les paramètres 'language' et 'city' depuis l'URL (si présents)
	const { language, city } = req.query;

	// Requête SQL pour récupérer tous les utilisateurs depuis la base de données
	database
		.query("SELECT * FROM users") // Requête SQL pour récupérer tous les utilisateurs
		.then(([users]) => {
			// Si un paramètre 'language' est fourni, filtrer les utilisateurs par langue
			if (language) {
				return res
					.status(200)
					.json(users.filter((user) => user.language === language));
			}

			// Si un paramètre 'city' est fourni, filtrer les utilisateurs par ville
			if (city) {
				return res.status(200).json(users.filter((user) => user.city === city));
			}

			// Si aucun paramètre n'est fourni, renvoyer tous les utilisateurs
			res.status(200).json(users);
		})
		.catch((err) => {
			// En cas d'erreur dans la requête SQL, renvoyer un statut 500 (erreur serveur)
			console.error(err);
			res.sendStatus(500);
		});
};

// Route pour récupérer un utilisateur spécifique par son ID
const getUsersById = (req, res) => {
	// Extraire l'ID depuis les paramètres de l'URL et le convertir en entier
	// biome-ignore lint/style/useNumberNamespace: <explanation>
	const id = parseInt(req.params.id, 10);

	// Rechercher l'utilisateur correspondant dans le tableau 'users'
	const user = users.find((user) => user.id === id);

	// Si l'utilisateur est trouvé, renvoyer ses informations
	if (user != null) {
		res.json(user); // Statut 200 par défaut pour une réponse JSON
	} else {
		// Si l'utilisateur n'est pas trouvé, renvoyer un statut 404 (non trouvé)
		res.status(404).send("Not Found");
	}
};

// Export des fonctions pour les utiliser dans d'autres fichiers (ex. routes Express)
module.exports = {
	getUsers, // Export de la fonction pour récupérer les utilisateurs
	getUsersById, // Export de la fonction pour récupérer un utilisateur par ID
};
