import type { IEvents } from "../../shared/events/EventEmmiter";
import { PhotoModalView } from "../views/photo-modal-view";

export function initPhotoModalView(events: IEvents) {
  const photoModalTemplate = document.querySelector<HTMLTemplateElement>(
    "[data-photo-modal-template]",
  );

  if (!photoModalTemplate) {
    throw new Error("photoModalTemplate не инициализирован");
  }

  return new PhotoModalView(photoModalTemplate, events);
}
