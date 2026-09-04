import type { PhotoItem } from "../../data/photos";

import { cloneTemplate } from "../../utils/clone-template";

import type { IEvents } from "../../shared/events/EventEmmiter";
import { AppEvents } from "../../shared/events/events";

export class PhotoModalView {
  private readonly _content: HTMLElement;
  private readonly _image: HTMLImageElement;
  private readonly _nextButton: HTMLButtonElement;
  private readonly _previousButton: HTMLButtonElement;

  constructor(
    template: HTMLTemplateElement,
    private readonly events: IEvents,
  ) {
    const content = cloneTemplate(template);
    const image = content.querySelector<HTMLImageElement>(
      "[data-photo-modal-image]",
    );

    const nextButton =
      content.querySelector<HTMLButtonElement>("[data-button-next]");

    const previousButton = content.querySelector<HTMLButtonElement>(
      "[data-button-previous]",
    );

    if (!content || !image || !nextButton || !previousButton) {
      throw new Error(
        "PhotoModalView: не найдены соответствующие элемнты из template",
      );
    }

    this._content = content;
    this._image = image;
    this._nextButton = nextButton;
    this._previousButton = previousButton;

    this.init();
  }

  private init(): void {
    this._nextButton.addEventListener("click", this.handleNextPhoto);
    this._previousButton.addEventListener("click", this.handlePreviousPhoto);
  }

  private handleNextPhoto = (): void => {
    this.events.emit(AppEvents.GALLERY_NEXT_PHOTO);
  };

  private handlePreviousPhoto = (): void => {
    this.events.emit(AppEvents.GALLERY_PREVIOUS_PHOTO);
  };

  render(photo: PhotoItem): HTMLElement {
    this._image.src = photo.src;
    this._image.alt = photo.alt;

    return this._content;
  }

  clear(): void {
    this._image.src = "";
    this._image.alt = "";
  }
}
