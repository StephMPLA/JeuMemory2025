// Récupère l'élément où la date sera insérée
const currentYearElement = document.getElementById('current-year');

// Récupère l'année actuelle
const currentYear = new Date().getFullYear();

// Insère l'année actuelle dans l'élément
currentYearElement.textContent = currentYear;