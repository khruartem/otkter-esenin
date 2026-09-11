import type { PhotoItem } from "../data/photos";

export interface IPhotoData {
  currentPhoto: PhotoItem;
  currentIndex: number;

  selectPhoto: (index: number) => void;
  changePhoto: (index: number) => void;
}

export class PhotoData implements IPhotoData {
  private readonly _photos: PhotoItem[];
  private _currentIndex = 0;

  constructor(photos: PhotoItem[]) {
    if (photos.length === 0) {
      throw new Error("Галерея должна содержать хотя бы одну фотографию");
    }

    this._photos = [...photos];
  }

  get currentIndex() {
    return this._currentIndex;
  }

  get currentPhoto(): PhotoItem {
    const currentPhoto = this._photos[this._currentIndex];

    if (!currentPhoto) {
      throw new Error("Фотография не найдена");
    }

    return currentPhoto;
  }

  selectPhoto(index: number): void {
    if (!Number.isInteger(index) || index < 0 || index >= this._photos.length) {
      throw new RangeError(`Недопустимый индекс фотографии: ${index}`);
    }

    this._currentIndex = index;
  }

  changePhoto(index: number) {
    if (index >= this._photos.length) {
      this._currentIndex = 0;
      return;
    }

    if (index < 0) {
      this._currentIndex = this._photos.length - 1;
      return;
    }

    this._currentIndex = index;
  }
}
