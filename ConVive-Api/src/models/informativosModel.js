export default class Informativo {
    constructor({ id = null, title, data, descriptionCard, descriptionModal }) {
        this.id = id;
        this.title = title;
        this.data = data;
        this.descriptionCard = descriptionCard;
        this.descriptionModal = descriptionModal;
    }
}
