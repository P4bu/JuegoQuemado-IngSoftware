const IMAGE_1_VIDA = "https://piskel-imgstore-b.appspot.com/img/526672b8-23d4-11f0-b4e1-2fdfd4e47724.gif";
const IMAGE_2_VIDAS = "https://piskel-imgstore-b.appspot.com/img/de1e8702-23d7-11f0-824c-2fdfd4e47724.gif";
const IMAGE_3_VIDAS = "https://piskel-imgstore-b.appspot.com/img/b9644c9c-23d7-11f0-b734-2fdfd4e47724.gif";
const IMAGE_5_VIDAS = "https://piskel-imgstore-b.appspot.com/img/e5772245-23d4-11f0-8940-2fdfd4e47724.gif";
const IMAGE_4_VIDAS = "https://piskel-imgstore-b.appspot.com/img/3c8ca20c-23d7-11f0-ab91-2fdfd4e47724.gif"; // 2 piernas
const IMAGE_6_VIDAS  = "https://piskel-imgstore-b.appspot.com/img/ffc3c5b3-23d4-11f0-bd65-2fdfd4e47724.gif";
const IMAGE_7_VIDAS = "https://piskel-imgstore-b.appspot.com/img/e63c4fcf-23d6-11f0-b8f9-2fdfd4e47724.gif";
const IMAGE_GAME_OVER = "https://piskel-imgstore-b.appspot.com/img/526672b8-23d4-11f0-b4e1-2fdfd4e47724.gif";

export default class ImageManager {

    constructor() {
        this.currentAttempts = 6;
        this.maxAttempts = 6;
        this.imageElement = null;
        this.attemptsElement = null;
        this.imagePaths = [
            IMAGE_7_VIDAS,
            IMAGE_6_VIDAS,
            IMAGE_5_VIDAS,
            IMAGE_4_VIDAS,
            IMAGE_3_VIDAS,
            IMAGE_2_VIDAS,
            IMAGE_1_VIDA,
            IMAGE_GAME_OVER
        ];
    }

    setElements(imageId, attemptsId) {
        this.imageElement = document.getElementById(imageId);
        this.attemptsElement = document.getElementById(attemptsId);
        return this;
    }
    
    reset() {
        this.currentAttempts = this.maxAttempts;
        this.updateImage();
        return this;
    }
    
    decrementAttempt() {
        if (this.currentAttempts > 0) {
            this.currentAttempts--;
            this.updateImage();
        }
        return this.currentAttempts;
    }
    
    updateImage() {
        const imageIndex = this.maxAttempts - this.currentAttempts;
        if (this.imageElement) {
            this.imageElement.src = this.imagePaths[imageIndex];
        }
        if (this.attemptsElement) {
            this.attemptsElement.textContent = this.currentAttempts;
        }
    }
    
    getAttempts() {
        return this.currentAttempts;
    }
}