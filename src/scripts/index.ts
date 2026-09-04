import { photos } from "../data/photos";
import { PhotoData } from "../models/photoData";

import { GalleryController } from "./controllers/gallery-controller";
import { ModalController } from "./controllers/modal-controller";

import { EventEmitter } from "../shared/events/EventEmmiter";
import { AppEvents } from "../shared/events/events";
import { PhotoModalView } from "./views/photo-modal-view";

// HTML элементы
const galleryElement = document.querySelector<HTMLElement>("[data-gallery]");

const modalElement = document.querySelector<HTMLDialogElement>("[data-modal]");

const photoModalTemplate = document.querySelector<HTMLTemplateElement>(
  "[data-photo-modal-template]",
);

if (!galleryElement || !modalElement || !photoModalTemplate) {
  throw new Error("Основные элементы не инициализированы");
}

// Брокер событий
const events = new EventEmitter();

// Модель
const photoData = new PhotoData(photos);

// UI контроллеры / View
const modalController = new ModalController(modalElement);

new GalleryController(galleryElement, events);

const photoModalView = new PhotoModalView(photoModalTemplate, events);

// Бизнес-логика
events.on<{ index: number }>(AppEvents.GALLERY_PHOTO_SELECTED, ({ index }) => {
  photoModalView.clear();

  photoData.currentIndex = index;

  const content = photoModalView.render(photoData.currentPhoto);

  modalController.open(content);
});

events.on(AppEvents.GALLERY_NEXT_PHOTO, () => {
  photoData.changePhoto(photoData.currentIndex + 1);

  const content = photoModalView.render(photoData.currentPhoto);

  modalController.update(content);
});

events.on(AppEvents.GALLERY_PREVIOUS_PHOTO, () => {
  photoData.changePhoto(photoData.currentIndex - 1);

  const content = photoModalView.render(photoData.currentPhoto);

  modalController.update(content);
});
