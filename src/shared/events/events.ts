const AppEvents = {
  ALL: "*",
  VIEW_ALL_RESET: "all:reset",
  GALLERY_PHOTO_SELECTED: "gallery:photoSelected",
  GALLERY_NEXT_PHOTO: "gallery:nextPhoto",
  GALLERY_PREVIOUS_PHOTO: "gallery:previousPhoto",
} as const;

type AppEvents = (typeof AppEvents)[keyof typeof AppEvents];

export { AppEvents };
