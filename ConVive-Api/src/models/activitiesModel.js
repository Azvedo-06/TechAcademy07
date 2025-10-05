export default class Activities {
    constructor({ id = null, title, descriptionCard, descriptionModal }) {
        this.id = id;
        this.title = title;
        this.descriptionCard = descriptionCard;
        this.descriptionModal = descriptionModal;
    }
}