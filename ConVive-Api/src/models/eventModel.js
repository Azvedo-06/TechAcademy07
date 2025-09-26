export default class Event {
    constructor({ id = null, title, date ,imagem = '', local = [], descriptionCard = '', descriptionModal = '', isEvent = true }) {
      this.id = id;
      this.title = title;
      this.date = date;
      this.imagem = imagem;
      this.local = local;
      this.descriptionCard = descriptionCard;
      this.descriptionModal = descriptionModal;
      this.isEvent = isEvent;
    }
  }