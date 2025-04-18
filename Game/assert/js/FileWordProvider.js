import WordProvider from './WordProvider.js';

export default class FileWordProvider extends WordProvider {
    constructor(repository) {
        super();
        this.repository = repository;
    }
    
    getRandomWord() {
        return this.repository.getRandomWord();
    }
}