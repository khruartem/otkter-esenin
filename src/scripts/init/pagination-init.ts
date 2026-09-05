import type { IEvents } from "../../shared/events/EventEmmiter";
import { PhotoPaginationController } from "../controllers/pagination-controller";

export function initPagination(root: HTMLElement, events: IEvents) {
  const paginationElement = root.querySelector<HTMLElement>(
    "[data-photo-pagination]",
  );

  if (!paginationElement) {
    throw new Error("Пагинатор не инициализирован");
  }

  return new PhotoPaginationController(paginationElement, events);
}
