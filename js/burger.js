// Gestion de l'ouverture/fermeture du menu burger
const burgerMenu = document.getElementById('burger-menu');
const navLinks = document.getElementById('nav-links');

// Vérifie que les éléments sont bien récupérés
console.log('burgerMenu:', burgerMenu);
console.log('navLinks:', navLinks);

if (burgerMenu && navLinks) {
    // Toggle du menu au clic sur le burger
    burgerMenu.addEventListener('click', () => {
        console.log('Burger clicked!');
        navLinks.classList.toggle('active');
        // Change l'icône burger en X si le menu est ouvert
        burgerMenu.textContent = navLinks.classList.contains('active') ? '✖' : '☰';
    });

    // Ferme le menu lorsqu'on clique sur un lien
    document.querySelectorAll('#nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burgerMenu.textContent = '☰';
        });
    });
} else {
    console.error('Les éléments burgerMenu ou navLinks ne sont pas trouvés');
}
