import WordRepository from './WordRepository.js';
import FileWordProvider from './FileWordProvider.js';
import ImageManager from './ImageManager.js';
import GameView from './GameView.js';
import ScoreCalculator from './ScoreCalculator.js';
import GameController from './GameController.js';
// import CalculadorPuntuacionAvanzado from './CalculadorPuntuacionAvanzado.js';

document.addEventListener('DOMContentLoaded', () => {
    // Creación de instancias
    const wordRepository = new WordRepository();
    const wordProvider = new FileWordProvider(wordRepository);
    
    const imageManager = new ImageManager()
        .setElements('hangman-img', 'attempts');
    
    const gameView = new GameView()
        .initialize('word-display', 'letters-container', 'game-message', 'score', 'game-content');
    
    const scoreCalculator = new ScoreCalculator();
    // Alternativamente: const scoreCalculator = new AdvancedScoreCalculator();
    
    // Inyección de dependencias
    const gameController = new GameController(
        wordProvider, 
        imageManager, 
        gameView, 
        scoreCalculator
    ).initialize();
});