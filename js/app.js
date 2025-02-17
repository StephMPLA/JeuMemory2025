let index = 0;
let jeu = document.getElementById('jeu');
let nbCarte = 6;
let newtableau = [];
let tableauClick = [];
let nombreDeClic = 0;
let nbclic = document.querySelector("span");
nbclic.style.display = "none";
let NbCarteTrouver = 0;
let DivVictory = document.getElementById("text-victory");
DivVictory.style.display = "none";
let tableau = [];

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

// Éléments interactifs
const select = document.getElementById("select");
const loadButton = document.getElementById("loadImages");
const imageContainer = document.getElementById("imageContainer");

// Événement de chargement des cartes
loadButton.addEventListener('click', () => {
    const selectedTheme = select.value;

    //Si aucun thème selectionné
    if (!themes[selectedTheme]) {
        alert("Veuillez choisir un thème valide.");
        return;
    }

    //Récupère le chemin et le nombre de carte dans chaque thème
    const [path, count] = themes[selectedTheme];
    tableau = [];
    newtableau = [];
    jeu.innerHTML = '';

    //Création du jeu
    for (let i = 1; i <= count; i++) {
        for (let j = 0; j < 2; j++) {
            let carte = document.createElement("div");
            carte.className = "carte";
            carte.style.width = "100px";
            carte.style.height = "100px";
            carte.style.perspective = "1000px";
            carte.style.display = "inline-block";
            carte.style.margin = "10px";

            let faceCachee = document.createElement("img");
            faceCachee.src = "img/question.svg";
            faceCachee.className = "face-cachee";
            faceCachee.style.width = "100%";
            faceCachee.style.position = "absolute";
            faceCachee.style.backfaceVisibility = "hidden";

            let faceReelle = document.createElement("img");
            faceReelle.src = `${path}/${i}.webp`;
            tableau.push(faceReelle.src);
            faceReelle.className = "face-reelle";
            faceReelle.style.width = "100%";
            faceReelle.style.transform = "rotateY(180deg)";
            faceReelle.style.position = "absolute";
            faceReelle.style.backfaceVisibility = "hidden";

            let carteInner = document.createElement("div");
            carteInner.className = "carte-inner";
            carteInner.style.width = "100%";
            carteInner.style.height = "100%";
            carteInner.style.position = "relative";
            carteInner.style.transformStyle = "preserve-3d";
            carteInner.style.transition = "transform 0.5s";

            carteInner.appendChild(faceCachee);
            carteInner.appendChild(faceReelle);
            carte.appendChild(carteInner);
            jeu.appendChild(carte);

            newtableau.push({ carte, carteInner, faceReelle, id: i });

            //Ajout evenement sur chaque carte
            carte.addEventListener('click', () => {
                if (tableauClick.length < 2 && !tableauClick.includes(carte)) {
                    nombreDeClic++;
                    nbclic.textContent = nombreDeClic.toString();
                    tableauClick.push(carte);
                    carteInner.style.transform = "rotateY(180deg)";

                    if (tableauClick.length === 2) {
                        setTimeout(() => {
                            let [carte1, carte2] = tableauClick;
                            let src1 = carte1.querySelector('.face-reelle').src;
                            let src2 = carte2.querySelector('.face-reelle').src;

                            if (src1 === src2) {
                                NbCarteTrouver += 2;

                                // Désactiver les cartes trouvées
                                carte1.removeEventListener('click', () => { });
                                carte2.removeEventListener('click', () => { });

                                // Vérifier si toutes les cartes ont été trouvées
                                if (NbCarteTrouver === count * 2) {
                                    jeu.style.display = "none";
                                    DivVictory.style.display = "block";
                                    DivVictory.style.fontSize = "28px";
                                    DivVictory.style.marginTop = "5vh";
                                    DivVictory.style.marginBottom = "5vh";
                                    DivVictory.style.textAlign = "center";
                                    DivVictory.textContent = "🎉 GAGNÉ ! 🎯";
                                    nbclic.style.display = "block";
                                    nbclic.style.fontSize = "28px";
                                    nbclic.style.marginBottom = "5vh";
                                    nbclic.textContent = `Vous avez gagné en ${nombreDeClic * .5} coups`;
                                    addScoreLocal(nombreDeClic * .5);
                                }
                            } else {
                                tableauClick.forEach(carte => {
                                    let inner = carte.querySelector(".carte-inner");
                                    setTimeout(() => {
                                        inner.style.transform = "rotateY(0deg)";
                                    }, 500);
                                });
                            }
                            tableauClick = [];
                        }, 1000);
                    }
                }
            });
        }
    }

    //Mélangeur de cartes
    newtableau.sort(() => Math.random() - 0.5);

    //Ajout des cartes dans le jeu
    newtableau.forEach(obj => {
        jeu.appendChild(obj.carte);
    });
});

function displayImages(images) {
    imageContainer.innerHTML = '';
    images.forEach(imgSrc => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `Image ${imgSrc}`;
        img.style.width = '100px';
        img.style.margin = '5px';
        imageContainer.appendChild(img);
    });
}

//Ajout du score dans le localStorage
function addScoreLocal(nombreDeClic) {
    let currentUser = localStorage.getItem('user');

    //Si l'utrilisateur est connecté
    if (currentUser) {
        let user = JSON.parse(currentUser);

        //Création d'un tableau de score s'il n'existe pas
        if (!user.scores) {
            user.scores = [];
        }

        //Ajout du nouveau score
        user.scores.push({
            date: new Date().toLocaleDateString('fr-FR'),
            theme: select.value,
            score: nombreDeClic
        })

        //Mise à jour du localStorage
        localStorage.setItem('user', JSON.stringify(user))
    }
}
