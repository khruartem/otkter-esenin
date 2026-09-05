import type { IEvents } from "../../shared/events/EventEmmiter";
import { GalleryController } from "../controllers/gallery-controller";

export function initGallery(events: IEvents) {
  const galleryElement = document.querySelector<HTMLElement>("[data-gallery]");

  if (!galleryElement) {
    throw new Error("Галерея не инициализирована");
  }

  return new GalleryController(galleryElement, events);
}
