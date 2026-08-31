import type { ImageMetadata } from "astro";

import photoSource1 from "../assets/images/gallery/photo_1.jpg";
import photoSource2 from "../assets/images/gallery/photo_2.jpg";
import photoSource3 from "../assets/images/gallery/photo_3.jpg";
import photoSource4 from "../assets/images/gallery/photo_4.jpg";
import photoSource5 from "../assets/images/gallery/photo_5.jpg";

export type PhotoItem = {
  src: ImageMetadata;
  alt: string;
};

export const photos: PhotoItem[] = [
  {
    src: photoSource1,
    alt: "Актер стоит на сценическом кубе, рядом пианистка играет на рояле",
  },
  {
    src: photoSource2,
    alt: "Актер эмоционально читает стихи, сидя на сцене возле рояля",
  },
  {
    src: photoSource3,
    alt: "Два актера передают друг другу чемодан во время спектакля",
  },
  {
    src: photoSource4,
    alt: "Актер сидит на сцене, позади него пианистка играет на рояле",
  },
  {
    src: photoSource5,
    alt: "Два актера исполняют сцену с раскинутыми руками под аккомпанемент рояля",
  },
];
