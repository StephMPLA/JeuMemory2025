let index = 0;
let jeu = document.getElementById('jeu');
let newtableau = [];
let tableauClick = [];
let nombreDeClic = 0;
let nbclic = document.querySelector("span");
nbclic.style.display = "none";
let NbCarteTrouver = 0;
let DivVictory = document.getElementById("text-victory");
DivVictory.style.display = "none";
let tableau = [];
let choose = document.getElementById("chooseUser");
const gridSizeSelect = document.getElementById("grid-size");

// Thèmes disponibles
const themes = {
    Alphabet: ["img/alphabet-scrabble", 26],
    Animaux: ["img/animaux", 27],
    Animes: ["img/animauxAnimes", 8],
    AnimauxDomestiques: ["img/animauxdomestiques", 10],
    Chiens: ["img/chiens", 23],
    Dinosaures: ["img/dinosaures", 10],
    DinosauresWithName: ["img/dinosauresAvecNom", 10],
    Legumes: ["img/memory-legume", 6]
};

// Options de taille de grille
const gridSizesDesktop = ["2x3", "3x3", "2x4", "3x4", "4x4", "4x5", "4x6", "5x6", "6x6", "6x7", "6x8"];
const gridSizesMobile = ["2x3", "3x3", "2x4", "3x4", "4x4"];

// Fonction pour ajuster la taille de la grille selon l'écran
function adjustGridSizeOptions() {
    gridSizeSelect.innerHTML = "";
    let sizes = window.innerWidth < 768 ? gridSizesMobile : gridSizesDesktop;
    
    sizes.forEach(size => {
        let option = document.createElement("option");
        option.value = size;
        option.textContent = size;
        gridSizeSelect.appendChild(option);
    });
}

// Appliquer la bonne liste de tailles au chargement et au redimensionnement
window.addEventListener('load', adjustGridSizeOptions);
window.addEventListener('resize', adjustGridSizeOptions);

// Chargement des cartes
document.getElementById('loadImages').addEventListener('click', () => {
    DivVictory.style.display = "none";
    nbclic.style.display = "none";
    nombreDeClic = 0;
    NbCarteTrouver = 0;
    tableauClick = [];
    jeu.innerHTML = '';

    const selectedTheme = document.getElementById("select").value;
    const [rows, cols] = gridSizeSelect.value.split('x').map(Number);

    if (!themes[selectedTheme]) {
        alert("Veuillez choisir un thème valide.");
        return;
    }

    const [path, maxImages] = themes[selectedTheme];
    let nbCartesSelectionnees = Math.min(Math.floor((rows * cols) / 2), maxImages);

    if (nbCartesSelectionnees * 2 > maxImages * 2) {
        alert("Pas assez d'images pour cette grille.");
        return;
    }

    let imagesDisponibles = Array.from({ length: maxImages }, (_, i) => i + 1);
    imagesDisponibles.sort(() => Math.random() - 0.5);
    imagesDisponibles = imagesDisponibles.slice(0, nbCartesSelectionnees);

    jeu.style.display = 'grid';
    jeu.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    jeu.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    jeu.style.gap = "10px";

    newtableau = [];
    tableau = [];

    imagesDisponibles.forEach(num => {
        for (let j = 0; j < 2; j++) {
            let carte = document.createElement("div");
            carte.className = "carte";
            carte.style.perspective = "1000px";
            carte.style.cursor = "pointer";

            let carteInner = document.createElement("div");
            carteInner.className = "carte-inner";
            carteInner.style.width = "100%";
            carteInner.style.height = "100%";
            carteInner.style.position = "relative";
            carteInner.style.transformStyle = "preserve-3d";
            carteInner.style.transition = "transform 0.5s";

            let faceCachee = document.createElement("img");
            faceCachee.src = "img/question.svg";
            faceCachee.className = "face-cachee";
            faceCachee.style.width = "100%";
            faceCachee.style.position = "absolute";
            faceCachee.style.backfaceVisibility = "hidden";

            let faceReelle = document.createElement("img");
            faceReelle.src = `${path}/${num}.webp`;
            faceReelle.className = "face-reelle";
            faceReelle.style.width = "100%";
            faceReelle.style.transform = "rotateY(180deg)";
            faceReelle.style.position = "absolute";
            faceReelle.style.backfaceVisibility = "hidden";

            carteInner.appendChild(faceCachee);
            carteInner.appendChild(faceReelle);
            carte.appendChild(carteInner);
            jeu.appendChild(carte);

            newtableau.push({ carte, carteInner, faceReelle, id: num });

            carte.addEventListener('click', () => {
                if (tableauClick.length < 2 && !tableauClick.includes(carte)) {
                    nombreDeClic++;
                    nbclic.textContent = nombreDeClic.toString();
                    tableauClick.push(carte);
                    carteInner.style.transform = "rotateY(180deg)";

                    if (tableauClick.length === 2) {
                        setTimeout(() => {
                            let [carte1, carte2] = tableauClick;
                            let id1 = carte1.querySelector('.face-reelle').src;
                            let id2 = carte2.querySelector('.face-reelle').src;

                            if (id1 === id2) {
                                NbCarteTrouver += 2;
                                carte1.style.pointerEvents = "none";
                                carte2.style.pointerEvents = "none";

                                if (NbCarteTrouver === nbCartesSelectionnees * 2) {
                                    jeu.style.display = "none";
                                    DivVictory.style.display = "block";
                                    DivVictory.textContent = "🎉 GAGNÉ ! 🎯";
                                    nbclic.style.display = "block";
                                    nbclic.textContent = `Vous avez gagné en ${nombreDeClic} coups`;
                                    addScoreLocal(nombreDeClic);
                                }
                            } else {
                                tableauClick.forEach(carte => {
                                    setTimeout(() => {
                                        carte.querySelector(".carte-inner").style.transform = "rotateY(0deg)";
                                    }, 500);
                                });
                            }
                            tableauClick = [];
                        }, 1000);
                    }
                }
            });
        }
    });

    newtableau.sort(() => Math.random() - 0.5);
    newtableau.forEach(obj => jeu.appendChild(obj.carte));

    adjustGameContainer();
});

// Ajuste la taille du conteneur et des cartes sur mobile
function adjustGameContainer() {
    jeu.style.width = "fit-content";
    jeu.style.maxWidth = "90vw";
    jeu.style.margin = "auto";

    if (window.innerWidth < 768) {
        document.querySelectorAll(".carte").forEach(carte => {
            carte.style.width = "15vw";
            carte.style.height = "15vw";
            carte.style.margin = "3px";
        });
    }
}

// Ajoute le score dans le localStorage
function addScoreLocal(nombreDeClic) {
    let currentUser = localStorage.getItem('user');
    if (currentUser) {
        let user = JSON.parse(currentUser);
        if (!user.scores) user.scores = [];
        user.scores.push({
            date: new Date().toLocaleDateString('fr-FR'),
            theme: document.getElementById("select").value,
            score: nombreDeClic
        });
        localStorage.setItem('user', JSON.stringify(user));
    }
}