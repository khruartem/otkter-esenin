import { GalleryController } from "../controllers/gallery-controller";

export function initGallery(): void {
  const root = document.querySelector<HTMLUListElement>("[data-gallery]");
  const currentPhoto = document.querySelector<HTMLImageElement>(
    "[data-current-photo]",
  );
  const nextButton =
    document.querySelector<HTMLButtonElement>("[data-next-button]");
  const previousButton = document.querySelector<HTMLButtonElement>(
    "[data-previous-button]",
  );

  if (!root || !currentPhoto || !nextButton || !previousButton) {
    throw new Error("Отсуствуют компоненты");
  }

  new GalleryController(root, currentPhoto, nextButton, previousButton).init();
}
