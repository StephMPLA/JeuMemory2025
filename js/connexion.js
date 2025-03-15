document.addEventListener("DOMContentLoaded", () => {
    const formconnexion = document.getElementById("formconnexion");
    const buttonConnexion = document.getElementsByClassName("connecter")[0]; // Sélection du bouton de connexion

    const loggedIn = localStorage.getItem("loggedIn");
    const userStorage = localStorage.getItem("currentUser"); // Récupération de l'utilisateur connecté

    // 🔹 Vérification si l'utilisateur est connecté dès le chargement de la page
    if (loggedIn === "true" && userStorage) {
        const user = JSON.parse(userStorage);
        buttonConnexion.innerText = "Se déconnecter";
        buttonConnexion.href = "#"; // Empêcher la redirection

        // ✅ Ajout d'un seul event listener pour la déconnexion
        buttonConnexion.removeEventListener("click", handleLogout);
        buttonConnexion.addEventListener("click", handleLogout);
    }

    // 🔹 Fonction de gestion de la déconnexion
    function handleLogout(e) {
        e.preventDefault();
        localStorage.removeItem("loggedIn"); // Supprime le statut de connexion
        localStorage.removeItem("currentUser"); // Supprime l'utilisateur actif
        alert("Vous avez été déconnecté.");
        window.location.reload(); // Recharge la page
    }

    // 🔹 Gestion du formulaire de connexion
    if (formconnexion) {
        formconnexion.addEventListener("submit", (e) => {
            e.preventDefault();

            // Récupération des valeurs
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            // Vérifier si `users` existe dans localStorage
            const usersStorage = localStorage.getItem("users");

            if (!usersStorage) {
                alert("❌ Aucun utilisateur enregistré.");
                return;
            }

            // Conversion en tableau JSON
            const users = JSON.parse(usersStorage);

            // 🔍 Rechercher l'utilisateur avec l'email et le mot de passe
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                alert(`✅ Bienvenue ${user.username} ! Connexion réussie.`);

                // 🔹 Enregistrer l'utilisateur connecté dans localStorage
                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("currentUser", JSON.stringify(user));

                // Modification du bouton Connexion → Déconnexion
                buttonConnexion.innerText = "Se déconnecter";
                buttonConnexion.href = "#";
                buttonConnexion.removeEventListener("click", handleLogout);
                buttonConnexion.addEventListener("click", handleLogout);

                // Redirection vers la page de profil après connexion
                setTimeout(() => {
                    window.location.href = "./profil.html";
                }, 1000);
            } else {
                alert("❌ Email ou mot de passe incorrect.");
            }
        });
    }
});
