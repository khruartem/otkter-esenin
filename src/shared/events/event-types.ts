import type { PhotoItem } from "../../data/photos";

export type GalleryPhotoSelectedPayload = {
  index: number;
};

export type GalleryPhotoChangedPayload = {
  photo: PhotoItem;
  index: number;
};
