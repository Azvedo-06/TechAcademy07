export default class Event {
    constructor({ id = null, title, date ,image = '', local = '', descriptionCard = '', descriptionModal = '', isEvent = true }) {
      this.id = id;
      this.title = title;
      this.date = date;
      this.image = image;
      this.local = local;
      this.descriptionCard = descriptionCard;
      this.descriptionModal = descriptionModal;
      this.isEvent = isEvent;
    }
  }