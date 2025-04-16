const WordLoader = {
    words: [],

    loadWordsFromFile: function(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const content = event.target.result;
                this.words = content
                    .split('\n')
                    .map(word => word.trim().toUpperCase())
                    .filter(word => word.length > 0);
                
                if (this.words.length === 0) {
                    reject("El archivo no contiene palabras válidas");
                } else {
                    resolve(this.words);
                }
            };
            reader.onerror = () => reject("Error al leer el archivo");
            reader.readAsText(file);
        });
    },

    getRandomWord: function() {
        if (this.words.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * this.words.length);
        return this.words[randomIndex];
    }
};

// Módulo para manejar las imágenes del ahorcado
const HangmanImageManager = {
    currentAttempts: 6,
    
    // En una implementación real, estas serían rutas a imágenes reales
    imagePaths: [
        "/api/placeholder/200/250?text=6_vidas",
        "/api/placeholder/200/250?text=5_vidas",
        "/api/placeholder/200/250?text=4_vidas",
        "/api/placeholder/200/250?text=3_vidas",
        "/api/placeholder/200/250?text=2_vidas",
        "/api/placeholder/200/250?text=1_vida",
        "/api/placeholder/200/250?text=Game_Over"
    ],
    
    reset: function() {
        this.currentAttempts = 6;
        this.updateImage();
    },
    
    decrementAttempt: function() {
        if (this.currentAttempts > 0) {
            this.currentAttempts--;
            this.updateImage();
        }
        return this.currentAttempts;
    },
    
    updateImage: function() {
        const imageIndex = 6 - this.currentAttempts;
        document.getElementById('hangman-img').src = this.imagePaths[imageIndex];
        document.getElementById('attempts').textContent = this.currentAttempts;
    },
    
    getAttempts: function() {
        return this.currentAttempts;
    }
};

// Módulo principal del juego
const HangmanGame = {
    currentWord: "",
    guessedLetters: [],
    score: 0,
    
    init: function() {
        this.setupEventListeners();
        this.resetGame();
    },
    
    setupEventListeners: function() {
        document.getElementById('word-file').addEventListener('change', this.handleFileUpload.bind(this));
        document.getElementById('new-game-btn').addEventListener('click', this.startNewGame.bind(this));
    },
    
    handleFileUpload: async function(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        try {
            await WordLoader.loadWordsFromFile(file);
            document.getElementById('game-content').classList.remove('hidden');
            this.startNewGame();
        } catch (error) {
            this.showMessage(error, 'error');
        }
    },
    
    startNewGame: function() {
        this.resetGame();
        this.currentWord = WordLoader.getRandomWord();
        if (!this.currentWord) {
            this.showMessage("No hay palabras disponibles", 'error');
            return;
        }
        
        this.updateWordDisplay();
        this.createLetterButtons();
        this.showMessage("¡Nueva partida iniciada!", 'info');
    },
    
    resetGame: function() {
        this.guessedLetters = [];
        HangmanImageManager.reset();
        document.getElementById('score').textContent = this.score;
    },
    
    updateWordDisplay: function() {
        const wordDisplay = document.getElementById('word-display');
        wordDisplay.innerHTML = '';
        
        for (const letter of this.currentWord) {
            const span = document.createElement('span');
            if (this.guessedLetters.includes(letter)) {
                span.textContent = letter;
            } else {
                span.textContent = '_';
            }
            wordDisplay.appendChild(span);
        }
    },
    
    createLetterButtons: function() {
        const lettersContainer = document.getElementById('letters-container');
        lettersContainer.innerHTML = '';
        
        for (let charCode = 65; charCode <= 90; charCode++) {
            const letter = String.fromCharCode(charCode);
            const button = document.createElement('button');
            button.textContent = letter;
            button.className = 'letter-btn';
            button.addEventListener('click', () => this.guessLetter(letter));
            lettersContainer.appendChild(button);
        }
    },
    
    guessLetter: function(letter) {
        // Evitar letras ya adivinadas
        if (this.guessedLetters.includes(letter)) return;
        
        this.guessedLetters.push(letter);
        
        // Deshabilitar el botón de la letra
        const buttons = document.querySelectorAll('.letter-btn');
        buttons.forEach(btn => {
            if (btn.textContent === letter) {
                btn.disabled = true;
            }
        });
        
        // Verificar si la letra está en la palabra
        if (this.currentWord.includes(letter)) {
            // Contar ocurrencias para la puntuación
            const occurrences = this.currentWord.split('').filter(l => l === letter).length;
            this.score += occurrences;
            document.getElementById('score').textContent = this.score;
            
            this.updateWordDisplay();
            
            // Verificar si ganó
            const allLettersGuessed = [...this.currentWord].every(letter => this.guessedLetters.includes(letter));
            if (allLettersGuessed) {
                this.showMessage(`¡Felicidades! Has adivinado la palabra: ${this.currentWord}`, 'success');
            }
        } else {
            // Letra incorrecta
            const remainingAttempts = HangmanImageManager.decrementAttempt();
            
            // Verificar si perdió
            if (remainingAttempts === 0) {
                this.showMessage(`¡Perdiste! La palabra era: ${this.currentWord}`, 'error');
            }
        }
    },
    
    showMessage: function(message, type) {
        const messageElement = document.getElementById('game-message');
        messageElement.textContent = message;
        messageElement.className = type || '';
    }
};

// Iniciar el juego cuando la página esté cargada
document.addEventListener('DOMContentLoaded', () => {
    HangmanGame.init();
});