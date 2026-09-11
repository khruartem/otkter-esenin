import type { ImageMetadata } from "astro";
import type { SvgComponent } from "astro/types";

import Telegram from "../assets/icons/telegram.svg";
import VK from "../assets/icons/vk.svg";

type Socials = {
  url: string;
  icon: SvgComponent & ImageMetadata;
};

export const socials: Socials[] = [
  {
    url: "https://t.me/otkterr",
    icon: Telegram,
  },
  {
    url: "https://vk.ru/otkter",
    icon: VK,
  },
];
