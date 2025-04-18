import wordProvider from './WordProvider.js';
import imageManager from './ImageManager.js';


export default class GameController {
    constructor(wordProvider, imageManager, gameView, scoreCalculator) {
        this.wordProvider = wordProvider;
        this.imageManager = imageManager;
        this.gameView = gameView;
        this.scoreCalculator = scoreCalculator;
        
        this.currentWord = "";
        this.guessedLetters = [];
        this.score = 0;
    }
    
    initialize() {
        this.setupEventListeners();
        this.resetGame();
        return this;
    }
    
    setupEventListeners() {
        document.getElementById('word-file').addEventListener('change', this.handleFileUpload.bind(this));
        document.getElementById('new-game-btn').addEventListener('click', this.startNewGame.bind(this));
    }
    
    async handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        try {
            if (this.wordProvider.repository) {
                await this.wordProvider.repository.loadFromFile(file);
                this.gameView.showContent();
                this.startNewGame();
            }
        } catch (error) {
            this.gameView.showMessage(error, 'error');
        }
    }
    
    startNewGame() {
        this.resetGame();
        this.currentWord = this.wordProvider.getRandomWord();
        
        if (!this.currentWord) {
            this.gameView.showMessage("No hay palabras disponibles", 'error');
            return;
        }
        
        this.updateUI();
        this.gameView.showMessage("¡Nueva partida iniciada!", 'info');
    }
    
    resetGame() {
        this.guessedLetters = [];
        this.imageManager.reset();
        this.gameView.updateScore(this.score);
    }
    
    updateUI() {
        this.gameView.updateWordDisplay(this.currentWord, this.guessedLetters);
        this.gameView.createLetterButtons(this.handleLetterClick.bind(this));
    }
    
    handleLetterClick(letter, button) {
        this.guessLetter(letter);
    }
    
    guessLetter(letter) {
        // Evitar letras ya adivinadas
        if (this.guessedLetters.includes(letter)) return;
        
        this.guessedLetters.push(letter);
        this.gameView.disableLetterButton(letter);
        
        // Verificar si la letra está en la palabra
        if (this.currentWord.includes(letter)) {
            // Calcular puntuación
            const points = this.scoreCalculator.calculateScore(this.currentWord, letter);
            this.score += points;
            this.gameView.updateScore(this.score);
            
            this.gameView.updateWordDisplay(this.currentWord, this.guessedLetters);
            
            // Verificar si ganó
            this.checkForWin();
        } else {
            // Letra incorrecta
            const remainingAttempts = this.imageManager.decrementAttempt();
            
            // Verificar si perdió
            if (remainingAttempts === 0) {
                this.gameView.showMessage(`¡Perdiste! La palabra era: ${this.currentWord}`, 'error');
            }
        }
    }
    
    checkForWin() {
        const allLettersGuessed = [...this.currentWord].every(letter => 
            this.guessedLetters.includes(letter)
        );
        
        if (allLettersGuessed) {
            this.gameView.showMessage(`¡Felicidades! Has adivinado la palabra: ${this.currentWord}`, 'success');
        }
    }
}