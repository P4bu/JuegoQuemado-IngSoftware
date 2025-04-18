export default class ScoreCalculator {
    calculateScore(word, letter) {
        // Implementación básica: cada ocurrencia vale 1 punto
        return word.split('').filter(l => l === letter).length;
    }
}