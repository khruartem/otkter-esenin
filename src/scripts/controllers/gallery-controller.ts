// // import type { IPhotoData } from "../../data/photos";

// import type { PhotoItem } from "../../data/photos";

// // export class GalleryController {
// //   private readonly _photoData: IPhotoData;
// //   private readonly _gallery: NodeListOf<HTMLImageElement> | undefined;
// //   private _dialog: HTMLDialogElement | null;
// //   private _leftButton: HTMLButtonElement | null | undefined;
// //   private _rightButton: HTMLButtonElement | null | undefined;
// //   private _currentPhoto: HTMLImageElement | null | undefined;

// //   constructor(
// //     root: HTMLElement | null,
// //     dialog: HTMLDialogElement | null,
// //     photoData: IPhotoData,
// //   ) {
// //     this._gallery = root?.querySelectorAll("[data-photo]");
// //     this._dialog = dialog;
// //     this._leftButton = dialog?.querySelector("data-left-button");
// //     this._rightButton = dialog?.querySelector("data-right-button");
// //     this._currentPhoto = dialog?.querySelector("data-current-image");

// //     this._photoData = photoData;
// //   }

// //   selectPhoto(src: string) {
// //     if (!this._currentPhoto) {
// //       throw new Error("Галерея должна содержать хотя бы одну фотографию");
// //     }

// //     this._currentPhoto.src = src;
// //   }

// //   clickPhoto(e: Event) {
// //     // this.selectPhoto((e.currentTarget as HTMLImageElement).src);
// //     this._dialog?.showModal();
// //   }

// //   init() {
// //     this._gallery!.forEach((photoEl) => {
// //       photoEl.addEventListener("click", this.clickPhoto);
// //     });
// //   }

// //   destroy() {
// //     this._gallery!.forEach((photoEl) => {
// //       photoEl.removeEventListener("click", this.clickPhoto);
// //     });
// //   }
// // }

// type PhotoHandler = (e: Event) => void;
// type NavigationHandler = () => void;
// type PhotoImage = { src: string; alt: string };

// export interface IGalleryController {
//   onPhotoSelect: PhotoHandler;
//   onNextPhoto: NavigationHandler;
//   onPreviousPhoto: NavigationHandler;
//   update: ({ src, alt }: PhotoImage) => void;
//   init: () => void;
//   destroy: () => void;
// }

// export class GalleryController implements IGalleryController {
//   private _onPhotoSelect: PhotoHandler;
//   private _onNextPhoto: NavigationHandler;
//   private _onPreviousPhoto: NavigationHandler;

//   constructor(
//     private readonly root: HTMLUListElement,
//     private currentPhoto: HTMLImageElement,
//     private readonly nextButton: HTMLButtonElement,
//     private readonly previousButton: HTMLButtonElement,
//   ) {
//     this._onPhotoSelect = () => console.log("onPhotoSelect не инициализирован");
//     this._onNextPhoto = () => console.log("onNextPhoto не инициализирован");
//     this._onPreviousPhoto = () =>
//       console.log("onPreviousPhoto не инициализирован");
//   }

//   set onPhotoSelect(handler: PhotoHandler) {
//     this._onPhotoSelect = handler;
//   }

//   set onNextPhoto(handler: NavigationHandler) {
//     this._onNextPhoto = handler;
//   }

//   set onPreviousPhoto(handler: NavigationHandler) {
//     this._onPreviousPhoto = handler;
//   }

//   private getOnPhotoSelect() {
//     return this._onPhotoSelect;
//   }

//   private getOnNextPhoto() {
//     return this._onNextPhoto;
//   }

//   private getOnPreviousPhoto() {
//     return this._onPreviousPhoto;
//   }

//   update({ src, alt }: PhotoImage) {
//     this.currentPhoto.src = src;
//     this.currentPhoto.alt = alt;
//   }

//   init() {
//     this.root.addEventListener("click", this.getOnPhotoSelect);
//     this.nextButton.addEventListener("click", this.getOnNextPhoto);
//     this.previousButton.addEventListener("click", this.getOnPreviousPhoto);
//   }

//   destroy() {
//     this.root.removeEventListener("click", this.getOnPhotoSelect);
//     this.nextButton.removeEventListener("click", this.getOnNextPhoto);
//     this.previousButton.removeEventListener("click", this.getOnPreviousPhoto);
//   }
// }

// import type { IPhotoData } from "../../data/photos";

// export class GalleryController {
//   private readonly _photoData: IPhotoData;
//   private readonly _gallery: NodeListOf<HTMLImageElement> | undefined;
//   private _dialog: HTMLDialogElement | null;
//   private _leftButton: HTMLButtonElement | null | undefined;
//   private _rightButton: HTMLButtonElement | null | undefined;
//   private _currentPhoto: HTMLImageElement | null | undefined;

//   constructor(
//     root: HTMLElement | null,
//     dialog: HTMLDialogElement | null,
//     photoData: IPhotoData,
//   ) {
//     this._gallery = root?.querySelectorAll("[data-photo]");
//     this._dialog = dialog;
//     this._leftButton = dialog?.querySelector("data-left-button");
//     this._rightButton = dialog?.querySelector("data-right-button");
//     this._currentPhoto = dialog?.querySelector("data-current-image");

//     this._photoData = photoData;
//   }

//   selectPhoto(src: string) {
//     if (!this._currentPhoto) {
//       throw new Error("Галерея должна содержать хотя бы одну фотографию");
//     }

//     this._currentPhoto.src = src;
//   }

//   clickPhoto(e: Event) {
//     // this.selectPhoto((e.currentTarget as HTMLImageElement).src);
//     this._dialog?.showModal();
//   }

//   init() {
//     this._gallery!.forEach((photoEl) => {
//       photoEl.addEventListener("click", this.clickPhoto);
//     });
//   }

//   destroy() {
//     this._gallery!.forEach((photoEl) => {
//       photoEl.removeEventListener("click", this.clickPhoto);
//     });
//   }
// }

import type { IEvents } from "../../shared/events/EventEmmiter";
import { AppEvents } from "../../shared/events/events";

export class GalleryController {
  constructor(
    private readonly root: HTMLUListElement,
    private readonly nextButton: HTMLButtonElement,
    private readonly previousButton: HTMLButtonElement,
    private readonly events: IEvents,
  ) {
    this.init();
  }

  private init(): void {
    this.root.addEventListener("click", this.handleClick);
    this.nextButton.addEventListener("click", this.handleNextPhoto);
    this.previousButton.addEventListener("click", this.handlePreviousPhoto);
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

  private handleNextPhoto = (): void => {
    this.events.emit(AppEvents.GALLERY_NEXT_PHOTO);
  };

  private handlePreviousPhoto = (): void => {
    this.events.emit(AppEvents.GALLERY_PREVIOUS_PHOTO);
  };

  destroy(): void {
    this.root.removeEventListener("click", this.handleClick);
    this.nextButton.removeEventListener("click", this.handleNextPhoto);
    this.previousButton.removeEventListener("click", this.handlePreviousPhoto);
  }
}
