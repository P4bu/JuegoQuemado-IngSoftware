export default class ImageManager {
    constructor() {
        this.currentAttempts = 6;
        this.maxAttempts = 6;
        this.imageElement = null;
        this.attemptsElement = null;
        this.imagePaths = [
            "/api/placeholder/200/250?text=6_vidas",
            "/api/placeholder/200/250?text=5_vidas",
            "/api/placeholder/200/250?text=4_vidas",
            "/api/placeholder/200/250?text=3_vidas",
            "/api/placeholder/200/250?text=2_vidas",
            "/api/placeholder/200/250?text=1_vida",
            "/api/placeholder/200/250?text=Game_Over"
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