import photoSource1 from "../assets/images/gallery/photo_1.png";
import photoSource2 from "../assets/images/gallery/photo_2.png";
import photoSource3 from "../assets/images/gallery/photo_3.png";
import photoSource4 from "../assets/images/gallery/photo_4.png";
import photoSource5 from "../assets/images/gallery/photo_5.png";

export type PhotoItem = {
  src: string;
  alt: string;
};

export const photos: PhotoItem[] = [
  {
    src: photoSource1.src,
    alt: "Актер стоит на сценическом кубе, рядом пианистка играет на рояле",
  },
  {
    src: photoSource2.src,
    alt: "Актер эмоционально читает стихи, сидя на сцене возле рояля",
  },
  {
    src: photoSource3.src,
    alt: "Два актера передают друг другу чемодан во время спектакля",
  },
  {
    src: photoSource4.src,
    alt: "Актер сидит на сцене, позади него пианистка играет на рояле",
  },
  {
    src: photoSource5.src,
    alt: "Два актера исполняют сцену с раскинутыми руками под аккомпанемент рояля",
  },
];
