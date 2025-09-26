export default class User {
    constructor({ id = null, name, cpf, telefone, isAdim = false }) {
        this.id = id;
        this.name = name;
        this.cpf = cpf; 
        this.telefone = telefone;
        this.isAdim = isAdim; // 'user' ou 'admin'
    }
}