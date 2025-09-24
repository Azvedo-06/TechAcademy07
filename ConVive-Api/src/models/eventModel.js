export default class Event {
    constructor({ id, title, data ,imagem = '', local = [], description = '', descriptionModal = '', isEvent = true }) {
      this.id = id;
      this.title = title;
      this.date = data;
      this.imagem = imagem;
      this.local = local;
      this.description = description;
      this.descriptionModal = descriptionModal;
      this.isEvent = isEvent;
    }
  }