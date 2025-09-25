export default class Event {
    constructor({ id, title, date ,imagem = '', local = [], description = '', descriptionModal = '', isEvent = true }) {
      this.id = id;
      this.title = title;
      this.date = date;
      this.imagem = imagem;
      this.local = local;
      this.description = description;
      this.descriptionModal = descriptionModal;
      this.isEvent = isEvent;
    }
  }