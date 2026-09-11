import type { PhotoItem } from "../../data/photos";
import type { AppEvents } from "./events";

export type GalleryPhotoSelectedPayload = {
  index: number;
};

export type GalleryPhotoChangedPayload = {
  photo: PhotoItem;
  index: number;
};

export type EventMap = {
  [AppEvents.GALLERY_PHOTO_SELECTED]: GalleryPhotoSelectedPayload;
  [AppEvents.GALLERY_PHOTO_CHANGED]: GalleryPhotoChangedPayload;
  [AppEvents.GALLERY_NEXT_PHOTO]: undefined;
  [AppEvents.GALLERY_PREVIOUS_PHOTO]: undefined;
};
