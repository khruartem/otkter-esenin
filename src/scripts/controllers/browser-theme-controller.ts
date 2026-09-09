export class BrowserThemeController {
  private static readonly FADE_DISTANCE = 80;

  constructor(
    private readonly root: HTMLElement,
  ) {
    this.init();
  }

  private init(): void {
    this.update();

    window.addEventListener(
      "scroll",
      this.handleScroll,
      { passive: true },
    );
  }

  private handleScroll = (): void => {
    this.update();
  };

  private update(): void {
    const scrollY = Math.max(window.scrollY, 0);

    const progress = Math.min(
      scrollY / BrowserThemeController.FADE_DISTANCE,
      1,
    );

    const opacity = 1 - progress;

    this.root.style.setProperty(
      "--browser-theme-opacity",
      String(opacity),
    );
  }

  destroy(): void {
    window.removeEventListener(
      "scroll",
      this.handleScroll,
    );
  }
}