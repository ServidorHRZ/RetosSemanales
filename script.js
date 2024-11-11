// Selectores de elementos
const startButtons = document.querySelectorAll('.start-btn');
const languageModal = document.getElementById('language-modal');
const challengeModal = document.getElementById('challenge-modal');
const languageButtons = document.querySelectorAll('.language-btn');
const closeModalButtons = document.querySelectorAll('.close-modal');

// Variables para almacenar el estado actual
let currentWeek = null;
let currentLevel = null;

// Al inicio del archivo, después de las constantes
let challenges = null;

// Función para cargar los retos
async function loadChallenges() {
    try {
        const response = await fetch('challenges.json');
        if (!response.ok) throw new Error('Error al cargar los datos');
        challenges = await response.json();
    } catch (error) {
        console.error('Error al cargar los retos:', error);
    }
}

// Cargar los retos cuando se inicia la página
document.addEventListener('DOMContentLoaded', loadChallenges);

// Manejador para los botones de "Comenzar"
startButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (!button.disabled) {
            const card = button.closest('.challenge-card');
            const section = card.closest('.level-section');
            
            currentWeek = card.dataset.week;
            currentLevel = section.id.split('-')[0];
            
            // Verificar si es un reto master
            if (currentLevel === 'master') {
                const masterType = card.dataset.level; // basic, intermediate o advanced
                showMasterChallenge(masterType);
            } else {
                languageModal.classList.add('active');
            }
        }
    });
});

// Nueva función para mostrar retos master
function showMasterChallenge(masterType) {
    try {
        const challengeInfo = challenges.master[masterType];
        
        if (challengeInfo) {
            // Actualizar el contenido del modal del reto
            document.getElementById('challenge-title').textContent = challengeInfo.title;
            document.getElementById('challenge-level').innerHTML = `<i class="fas fa-layer-group"></i> ${challengeInfo.difficulty}`;
            document.getElementById('challenge-week').innerHTML = `<i class="fas fa-crown"></i> Reto Master`;
            document.getElementById('challenge-language').innerHTML = `<i class="fas fa-code"></i> Proyecto Completo`;
            
            // Crear el contenido de la descripción
            const descriptionHTML = `
                <div class="challenge-section">
                    <h3><i class="fas fa-info-circle"></i> Descripción</h3>
                    <p>${challengeInfo.description}</p>
                </div>
                <div class="challenge-section">
                    <h3><i class="fas fa-list-check"></i> Requisitos</h3>
                    <ul>
                        ${challengeInfo.requirements.map(req => `<li>${req}</li>`).join('')}
                    </ul>
                </div>
                <div class="challenge-section">
                    <h3><i class="fas fa-code"></i> Ejemplos</h3>
                    ${challengeInfo.examples.map(example => `
                        <div class="code-example">
                            <p>Input: ${example.input}</p>
                            <p>Output: ${example.output}</p>
                        </div>
                    `).join('')}
                </div>
            `;
            
            document.getElementById('challenge-description').innerHTML = descriptionHTML;
            challengeModal.classList.add('active');
        } else {
            console.error('Reto master no encontrado');
        }
    } catch (error) {
        console.error('Error al cargar el reto master:', error);
    }
}

// Manejador para los botones de lenguaje
languageButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
        e.preventDefault();
        const language = button.dataset.language;
        
        try {
            // Cargar los retos directamente desde la variable global challenges
            const challengeInfo = challenges[currentLevel]?.[`week${currentWeek}`]?.[language];
            
            if (challengeInfo) {
                // Actualizar el contenido del modal del reto
                document.getElementById('challenge-title').textContent = challengeInfo.title;
                document.getElementById('challenge-level').innerHTML = `<i class="fas fa-layer-group"></i> ${challengeInfo.difficulty}`;
                document.getElementById('challenge-week').innerHTML = `<i class="fas fa-calendar-week"></i> Semana ${currentWeek}`;
                document.getElementById('challenge-language').innerHTML = `<i class="fas fa-code"></i> ${language}`;
                
                // Crear el contenido de la descripción
                const descriptionHTML = `
                    <div class="challenge-section">
                        <h3><i class="fas fa-info-circle"></i> Descripción</h3>
                        <p>${challengeInfo.description}</p>
                    </div>
                    <div class="challenge-section">
                        <h3><i class="fas fa-list-check"></i> Requisitos</h3>
                        <ul>
                            ${challengeInfo.requirements.map(req => `<li>${req}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="challenge-section">
                        <h3><i class="fas fa-code"></i> Ejemplos</h3>
                        ${challengeInfo.examples.map(example => `
                            <div class="code-example">
                                <p>Input: ${example.input}</p>
                                <p>Output: ${example.output}</p>
                            </div>
                        `).join('')}
                    </div>
                `;
                
                document.getElementById('challenge-description').innerHTML = descriptionHTML;
                
                languageModal.classList.remove('active');
                challengeModal.classList.add('active');
            } else {
                console.error('Reto no encontrado');
            }
        } catch (error) {
            console.error('Error al cargar el reto:', error);
        }
    });
});

// Manejador para cerrar los modales
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        languageModal.classList.remove('active');
        challengeModal.classList.remove('active');
    });
});

// Cerrar modales al hacer clic fuera del contenido
[languageModal, challengeModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// Actualizar el manejador del botón de entregar
document.querySelector('.submit-btn').addEventListener('click', function() {
    // Enlaces para cada nivel y semana
    const challengeLinks = {
        'basic': {
            '1': 'https://drive.google.com/drive/folders/1wXgi8Wchp8SIDKWeWXIGV6kDD7GGano_?usp=drive_link',
            '2': 'https://drive.google.com/drive/folders/1_HYa-FsrGw8A9siTPx1UJAtpcGU2-4yJ?usp=drive_link',
            '3': 'https://drive.google.com/drive/folders/13T0eSUn5RdVFQrW2rjPw96DE1Qjr1fxE?usp=drive_link'
        },
        'intermediate': {
            '1': 'https://drive.google.com/drive/folders/1y4doIWW0CNAoMEaA4fzwloaqC_SaWrbS?usp=drive_link',
            '2': 'https://drive.google.com/drive/folders/1sk4H1hIcnh0MX2kOqjLM2OuN4FrG2egc?usp=drive_link',
            '3': 'https://drive.google.com/drive/folders/1oXd0cwjFfRDTtAGgQDQ5Ekif67-3kPzf?usp=drive_link'
        },
        'advanced': {
            '1': 'https://drive.google.com/drive/folders/1HQWdwbJ2Uy1fn_hPeVGOSfOfLwMP7J-O?usp=drive_link',
            '2': 'https://drive.google.com/drive/folders/1PJ0hjr-zKMzHC1U5l-t3dDi_NASQcecF?usp=drive_link',
            '3': 'https://drive.google.com/drive/folders/10tiRTslSSnuo3Hsh4Iqcu6JRkVL8I4FX?usp=drive_link'
        }
    };

    // Obtener el enlace correspondiente al nivel y semana actual
    const link = challengeLinks[currentLevel]?.[currentWeek];
    
    // Si existe un enlace para ese nivel y semana, abrirlo
    if (link) {
        window.open(link, '_blank');
    }
}); 