const form = document.getElementById("formInscription");
const displayDiv = document.getElementById("displayData");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Récupération des valeurs
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validation basique du mot de passe
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(password)) {
        alert('⚠️ Le mot de passe doit contenir au moins 6 caractères, un chiffre et un symbole.');
        return;
    }

    if (password !== confirmPassword) {
        alert('❌ Les mots de passe ne correspondent pas.');
        return;
    }

    // Création d'un objet utilisateur
    const userData = {
        username,
        email,
        password
    };

    // Stockage dans le localStorage
    localStorage.setItem('user', JSON.stringify(userData));

    // Réinitialisation du formulaire
    form.reset();

    // Affichage d'un message temporaire avant la redirection
    const message = document.createElement('div');
    message.textContent = "✅ Inscription réussie ! Redirection en cours...";
    message.style.color = 'green';
    message.style.fontSize = '1.2em';
    message.style.textAlign = 'center';
    message.style.marginTop = '20px';
    document.body.appendChild(message);

    // Redirection avec un léger délai
    setTimeout(() => {
        window.location.href = "./index.html";
    }, 1500);
});

// Affiche les données enregistrées
function displayData() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        displayDiv.innerHTML = `
            <h3>🗂️ Données enregistrées :</h3>
            <p><strong>👤 Nom d'utilisateur :</strong> ${user.username}</p>
            <p><strong>📧 Email :</strong> ${user.email}</p>
            <p><strong>🔒 Mot de passe :</strong> ${user.password}</p>
        `;
    } else {
        displayDiv.textContent = 'Aucune donnée enregistrée.';
    }
}

// Affichage au chargement de la page
window.addEventListener('DOMContentLoaded', displayData);
