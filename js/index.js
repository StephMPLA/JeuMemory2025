document.addEventListener("DOMContentLoaded", () => {
    const buttonConnexion = document.getElementsByClassName("connecter")[0];
    const buttonInscription = document.getElementsByClassName("inscrire")[0]; // Sélectionne le bouton "S'inscrire"
    const loggedIn = localStorage.getItem("loggedIn");
    const userStorage = localStorage.getItem("currentUser");
    const welcomeMessage = localStorage.getItem("welcomeMessage");

    // 🔹 Affichage du message de bienvenue si l'utilisateur vient de s'inscrire
    if (welcomeMessage) {
        alert(welcomeMessage);
        localStorage.removeItem("welcomeMessage"); // On supprime le message après l'affichage
    }

    // 🔹 Vérifier si l'utilisateur est connecté
    if (loggedIn === "true" && userStorage) {
        buttonConnexion.innerText = "Se déconnecter";
        buttonConnexion.href = "#";
        buttonConnexion.removeEventListener("click", handleLogout);
        buttonConnexion.addEventListener("click", handleLogout);

        // 🔹 Masquer le bouton "S'inscrire" si connecté
        if (buttonInscription) {
            buttonInscription.style.display = "none";
        }
    } else {
        // 🔹 Réafficher "S'inscrire" si déconnecté
        if (buttonInscription) {
            buttonInscription.style.display = "block";
        }
    }

    function handleLogout(e) {
        e.preventDefault();
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("currentUser");
        alert("Vous avez été déconnecté.");
        window.location.reload();
    }
});
