import type { ImageMetadata } from "astro";

import yakovlevAvatar from "../assets/avatars/yakovlev.png";
import maltcevAvatar from "../assets/avatars/maltcev.png";
import knyshAvatar from "../assets/avatars/knysh.png";
import oblemuhinaAvatar from "../assets/avatars/oblemuhina.png";

export type Artist = {
  name: string;
  avatar: ImageMetadata;
  role: string;
  regal: string;
};

export const artists: Artist[] = [
  {
    name: "Дмитрий Мальцев",
    avatar: maltcevAvatar,
    role: "Сергей Есенин",
    regal: "Актёр театра «Ленком Марка Захарова»",
  },
  {
    name: "Олег Кныш",
    avatar: knyshAvatar,
    role: "«Я»",
    regal: "Актёр театра «Ленком Марка Захарова»",
  },
  {
    name: "Анастасия Обмелюхина",
    avatar: oblemuhinaAvatar,
    role: "Фортепиано",
    regal: "Артистка театра «Ленком Марка Захарова»",
  },
  {
    name: "Сергей Яковлев",
    avatar: yakovlevAvatar,
    role: "Режиссёр-постановщик",
    regal: "Актёр театра «Ленком Марка Захарова»",
  },
];
