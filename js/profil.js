// Récupération des éléments DOM
let info = document.getElementById("info");

// Affiche les informations de l'utilisateur si connecté
function display() {
    // Vérification de la connexion
    const isLoggedIn = localStorage.getItem("loggedIn");

    // Si l'utilisateur est connecté
    if (isLoggedIn === "true") {
        const userData = localStorage.getItem("user");

        if (userData) {
            const user = JSON.parse(userData);

            // Affiche les informations de l'utilisateur
            info.innerHTML = `
            <p><strong>👤 Nom d'utilisateur :</strong> ${user.username}</p>
            <p><strong>📧 Email :</strong> ${user.email}</p>
            <p><strong>🔒 Mot de passe :</strong> ${user.password}</p>
            <div class="separate"></div>
            <h3>🗂️ Historique des scores :</h3>

            `;

            if (user.scores && user.scores.length > 0) {
                let table = document.createElement("table");
                table.border = "1";
                table.style.width = "800px";
                table.style.textAlign = "center";
            
                //Création de l'en-tête du tableau
                let thead = document.createElement("thead");
                thead.innerHTML = `
                    <tr>
                     <th>📅 Date</th>
                        <th>🎭 Thème</th>
                        <th>🎯 Score</th>
                    </tr>`;
                    table.appendChild(thead);

                    //Création du corps du tableau
                    let tbody = document.createElement("tbody");
                    
                       // Remplissage du tableau avec les scores
                       user.scores.forEach(score => {
                        let tr = document.createElement("tr");
                        tr.innerHTML = `
                            <td>${score.date}</td>
                            <td>${score.theme}</td>
                            <td>${score.score}</td>
                        `;
                        tbody.appendChild(tr);
                    });
    
                    table.appendChild(tbody);
                    info.appendChild(table);
            }

        } else {
            info.innerHTML = `<p>⚠️ Impossible de récupérer les informations de l'utilisateur.</p>`;
        }
    } else {
        // Si l'utilisateur n'est pas connecté
        info.innerHTML = `<p><strong>❌ Vous n'êtes pas connecté.</strong></p>`;
    }
}

// Appel de la fonction au chargement de la page
display();