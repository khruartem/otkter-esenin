import { photos } from "../data/photos";

import { PhotoData } from "../models/photoData";

import { EventEmitter } from "../shared/events/EventEmmiter";
import { AppEvents } from "../shared/events/events";
import type { GalleryPhotoChangedPayload } from "../shared/events/event-types";

import { initGallery } from "./init/gallery-init";
import { initModal } from "./init/modal-init";
import { initPhotoModalView } from "./init/photo-modal-view-init";
import { initPagination } from "./init/pagination-init";
import { initCommunication } from "./init/communication-init";
import { initBrowserTheme } from "./init/browser-theme-init";

// Брокер событий
const events = new EventEmitter();

// Модель
const photoData = new PhotoData(photos);

// UI контроллеры / View
initBrowserTheme();
initCommunication();
initGallery(events);
const modalController = initModal();
const photoModalView = initPhotoModalView(events);
const paginationController = initPagination(photoModalView.content, events);

// Бизнес-логика
const emitPhotoChanged = (): void => {
  events.emit(AppEvents.GALLERY_PHOTO_CHANGED, {
    index: photoData.currentIndex,
    photo: photoData.currentPhoto,
  });
};

events.on(AppEvents.GALLERY_PHOTO_SELECTED, ({ index }) => {
  photoModalView.clear();

  photoData.selectPhoto(index);
  emitPhotoChanged();

  const content = photoModalView.render(photoData.currentPhoto);

  modalController.open(content);
});

events.on(AppEvents.GALLERY_NEXT_PHOTO, () => {
  photoData.changePhoto(photoData.currentIndex + 1);
  emitPhotoChanged();

  const content = photoModalView.render(photoData.currentPhoto);

  modalController.update(content);
});

events.on(AppEvents.GALLERY_PREVIOUS_PHOTO, () => {
  photoData.changePhoto(photoData.currentIndex - 1);
  emitPhotoChanged();

  const content = photoModalView.render(photoData.currentPhoto);

  modalController.update(content);
});

events.on(AppEvents.GALLERY_PHOTO_CHANGED, ({ index, photo }) => {
  photoModalView.render(photo);
  paginationController.update(index);
});
