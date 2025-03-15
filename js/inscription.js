document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formInscription");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            // Récupération des valeurs du formulaire
            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            // Validation du mot de passe
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

            if (!passwordRegex.test(password)) {
                alert("⚠️ Le mot de passe doit contenir au moins 6 caractères, un chiffre et un symbole.");
                return;
            }

            if (password !== confirmPassword) {
                alert("❌ Les mots de passe ne correspondent pas.");
                return;
            }

            // Vérifier si l'utilisateur existe déjà
            const usersStorage = localStorage.getItem("users");
            let users = usersStorage ? JSON.parse(usersStorage) : [];

            const userExists = users.find(user => user.email === email);
            if (userExists) {
                alert("⚠️ Cet email est déjà utilisé. Veuillez utiliser un autre email.");
                return;
            }

            // Ajouter le nouvel utilisateur
            const newUser = { username, email, password };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            // Enregistrer l'utilisateur connecté
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("currentUser", JSON.stringify(newUser));

            // Réinitialisation du formulaire
            form.reset();

            // ✅ Stocker un message temporaire pour l'afficher après la redirection
            localStorage.setItem("welcomeMessage", `✅ Bienvenue ${username} ! Vous êtes maintenant connecté.`);

            // Redirection vers la page d'accueil
            window.location.href = "./index.html";
        });
    }
});
