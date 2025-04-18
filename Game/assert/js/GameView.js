export default class GameView {
    constructor() {
        this.wordDisplay = null;
        this.lettersContainer = null;
        this.messageElement = null;
        this.scoreElement = null;
        this.gameContent = null;
    }

    initialize(wordDisplayId, lettersContainerId, messageId, scoreId, gameContentId) {
        this.wordDisplay = document.getElementById(wordDisplayId);
        this.lettersContainer = document.getElementById(lettersContainerId);
        this.messageElement = document.getElementById(messageId);
        this.scoreElement = document.getElementById(scoreId);
        this.gameContent = document.getElementById(gameContentId);
        return this;
    }

    showContent() {
        if (this.gameContent) {
            this.gameContent.classList.remove('hidden');
        }
    }

    updateWordDisplay(word, guessedLetters) {
        if (!this.wordDisplay) return;
        
        this.wordDisplay.innerHTML = '';
        
        for (const letter of word) {
            const span = document.createElement('span');
            if (guessedLetters.includes(letter)) {
                span.textContent = letter;
            } else {
                span.textContent = '_';
            }
            this.wordDisplay.appendChild(span);
        }
    }

    createLetterButtons(onLetterClick) {
        if (!this.lettersContainer) return;
        
        this.lettersContainer.innerHTML = '';
        
        for (let charCode = 65; charCode <= 90; charCode++) {
            const letter = String.fromCharCode(charCode);
            const button = document.createElement('button');
            button.textContent = letter;
            button.className = 'letter-btn';
            button.addEventListener('click', () => onLetterClick(letter, button));
            this.lettersContainer.appendChild(button);
        }
    }

    disableLetterButton(letter) {
        const buttons = this.lettersContainer.querySelectorAll('.letter-btn');
        buttons.forEach(btn => {
            if (btn.textContent === letter) {
                btn.disabled = true;
            }
        });
    }

    updateScore(score) {
        if (this.scoreElement) {
            this.scoreElement.textContent = score;
        }
    }

    showMessage(message, type) {
        if (this.messageElement) {
            this.messageElement.textContent = message;
            this.messageElement.className = type || '';
        }
    }
}