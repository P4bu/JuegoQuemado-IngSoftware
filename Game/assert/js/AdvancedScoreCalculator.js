import ScoreCalculator from './ScoreCalculator.js'

export default class AdvancedScoreCalculator extends ScoreCalculator {
    calculateScore(word, letter) {
        // Implementación avanzada: puntos basados en la dificultad de la letra
        const difficultyMap = {
            'A': 1, 'E': 1, 'I': 1, 'O': 1, 'U': 1, 
            'S': 1, 'N': 1, 'R': 1, 'T': 1, 'L': 1,
            'D': 2, 'G': 2, 'C': 2, 'M': 2, 'B': 2, 'P': 2,
            'H': 3, 'F': 3, 'V': 3, 'Y': 3, 'Q': 3, 
            'J': 4, 'K': 4, 'W': 4, 'X': 4, 'Z': 4
        };
        
        const occurrences = word.split('').filter(l => l === letter).length;
        return occurrences * (difficultyMap[letter] || 1);
    }
}