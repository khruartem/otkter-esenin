import { BrowserThemeController } from "../controllers/browser-theme-controller";

export function initBrowserTheme(): void {
  const browserThemeElement = document.querySelector<HTMLElement>(
    "[data-browser-theme-bar]",
  );

  if (!browserThemeElement) {
    return;
  }

  new BrowserThemeController(browserThemeElement);
}
