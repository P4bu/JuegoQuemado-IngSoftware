export default class WordRepository {
    constructor() {
        this.words = [];
    }

    async loadFromFile(file) {
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
    }

    getRandomWord() {
        if (this.words.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * this.words.length);
        return this.words[randomIndex];
    }
}