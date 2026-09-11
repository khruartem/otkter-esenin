import type { GalleryPhotoSelectedPayload } from "../../shared/events/event-types";
import type { IEvents } from "../../shared/events/EventEmmiter";
import { AppEvents } from "../../shared/events/events";

export class PhotoPaginationController {
  private readonly items: HTMLElement[];

  constructor(
    private readonly root: HTMLElement,
    private readonly events: IEvents,
  ) {
    this.items = Array.from(
      this.root.querySelectorAll<HTMLElement>("[data-pagination-index]"),
    );

    this.init();
  }

  private init(): void {
    this.root.addEventListener("click", this.handleClick);
  }

  update(currentIndex: number): void {
    this.items.forEach((item, index) => {
      const isActive = index === currentIndex;

      item.toggleAttribute("data-active", isActive);

      if (isActive) {
        item.setAttribute("aria-current", "true");
      } else {
        item.removeAttribute("aria-current");
      }
    });
  }

  private handleClick = (event: MouseEvent): void => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const item = target.closest<HTMLElement>("[data-pagination-index]");

    if (!item) {
      return;
    }

    const index = Number(item.dataset.paginationIndex);

    if (Number.isNaN(index)) {
      throw new Error("Индекс фото не является числом");
    }

    this.events.emit(AppEvents.GALLERY_PHOTO_SELECTED, { index });
  };

  destroy(): void {
    this.root.removeEventListener("click", this.handleClick);
  }
}
