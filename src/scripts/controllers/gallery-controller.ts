import { AppEvents } from "../../shared/events/events";
import type { GalleryPhotoSelectedPayload } from "../../shared/events/event-types";
import type { IEvents } from "../../shared/events/EventEmmiter";

export class GalleryController {
  constructor(
    private readonly root: HTMLElement,
    private readonly events: IEvents,
  ) {
    this.init();
  }

  private init(): void {
    this.root.addEventListener("click", this.handleClick);
  }

  private handleClick = (event: MouseEvent): void => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    const item = target.closest<HTMLElement>("[data-gallery-index]");

    // Кликнули внутри галереи, но не по элементу с data-gallery-index
    if (!item) {
      return;
    }

    const index = Number(item.dataset.galleryIndex);

    if (Number.isNaN(index)) {
      throw new Error("Индекс фото не является числом");
    }

    this.events.emit(AppEvents.GALLERY_PHOTO_SELECTED, { index });
  };

  destroy(): void {
    this.root.removeEventListener("click", this.handleClick);
  }
}
