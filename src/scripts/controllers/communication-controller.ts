export class CommunicationCotroller {
  private readonly _communication: HTMLElement;
  private readonly _defaultMarginPx: string = "8px";
  private _afterMarginPx: string;

  constructor(root: HTMLElement) {
    const media = root.querySelector("[data-communication-media]");
    const arrow = root.querySelector("[data-communication-arrow]");

    if (!(media instanceof HTMLElement)) {
      throw new Error("Элемент media не инициализирован");
    }

    if (!(arrow instanceof HTMLElement)) {
      throw new Error("Элемент arrow не инициализирован");
    }

    const mediaWidthPx = `${media.clientWidth}px`;
    const arrowWidthPx = `${arrow.clientWidth}px`;

    this._afterMarginPx = `calc(100% - ${mediaWidthPx} - ${arrowWidthPx})`;

    this._communication = root;

    this.init();
  }

  private init(): void {
    this._communication.addEventListener("mouseenter", this.handleOnMouseEnter);
    this._communication.addEventListener("mouseleave", this.handleOnMouseLeave);
  }

  private handleOnMouseEnter = (): void => {
    this._communication.style.setProperty("--media-width", this._afterMarginPx);
  };

  private handleOnMouseLeave = (): void => {
    this._communication.style.setProperty(
      "--media-width",
      this._defaultMarginPx,
    );
  };

  destroy(): void {
    this._communication.removeEventListener(
      "mouseenter",
      this.handleOnMouseEnter,
    );
    this._communication.removeEventListener(
      "mouseleave",
      this.handleOnMouseLeave,
    );
  }
}
