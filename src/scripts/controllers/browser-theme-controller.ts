export class BrowserThemeController {
  private static readonly SCROLL_THRESHOLD = 25;

  constructor(private readonly root: HTMLElement) {
    this.init();
  }

  private init(): void {
    this.update();

    window.addEventListener("scroll", this.handleScroll, { passive: true });
  }

  private handleScroll = (): void => {
    this.update();
  };

  private update(): void {
    const isScrolled = window.scrollY > BrowserThemeController.SCROLL_THRESHOLD;

    this.root.toggleAttribute("data-transparent", isScrolled);
  }

  destroy(): void {
    window.removeEventListener("scroll", this.handleScroll);
  }
}
