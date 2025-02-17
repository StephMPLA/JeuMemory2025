const formconnexion = document.getElementById("formconnexion");

formconnexion.addEventListener('submit', (e) => {
    e.preventDefault();


    // Récupération des valeurs
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Stockage dans le localStorage
    let userStorage = localStorage.getItem('user', JSON.stringify('user'));

    //Conversion des donénes en Json Objet
    const user = JSON.parse(userStorage);

    if(email === user.email && password === user.password)
    {
        alert(`✅ Bienvenue ${user.username} ! Connexion réussie.`);

        //Enregistrer dans le localSortage que l'utilisateur est connecté
        localStorage.setItem('loggedIn', 'true');

        window.location.href = "./profil.html";

    }

    // Redirection avec un léger délai
    setTimeout(() => {
    }, 1500);
});