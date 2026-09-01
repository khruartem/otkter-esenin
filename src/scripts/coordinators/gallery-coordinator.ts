import type { IPhotoData } from "../../data/photosData";
import type { IGalleryController } from "../controllers/gallery-controller";

export class GalleryCoordinator {
  constructor(
    private readonly photoData: IPhotoData,
    private readonly galleryController: IGalleryController,
  ) {}

  init() {
    this.galleryController.onPhotoSelect = (e: Event) => {
      const selectedPhoto = e.currentTarget as HTMLImageElement;
      const index = Number(selectedPhoto.dataset.index);

      this.photoData.currentIndex = index;
      const src = this.photoData.currentPhoto.src.src;
      const alt = this.photoData.currentPhoto.alt;
      this.galleryController.update({ src, alt });
    };

    this.galleryController.onNextPhoto = () => {
      this.photoData.changePhoto(this.photoData.currentIndex + 1);
    };

    this.galleryController.onPreviousPhoto = () => {
      this.photoData.changePhoto(this.photoData.currentIndex - 1);
    };
  }
}
