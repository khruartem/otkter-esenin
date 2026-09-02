export class ModalController {
  private readonly contentElement: HTMLElement;
  private readonly closeButton: HTMLButtonElement;

  constructor(private readonly root: HTMLDialogElement) {
    const contentElement = root.querySelector<HTMLElement>(
      "[data-modal-content]",
    );

    const closeButton =
      root.querySelector<HTMLButtonElement>("[data-modal-close]");

    if (!contentElement || !closeButton) {
      throw new Error("ModalController: не найдены обязательные компоненты");
    }

    this.contentElement = contentElement;
    this.closeButton = closeButton;

    this.init();
  }

  private init(): void {
    this.closeButton.addEventListener("click", this.close);

    this.root.addEventListener("click", this.handleBackdropClick);
  }

  open(content: HTMLElement): void {
    this.contentElement.replaceChildren(content);

    this.root.showModal();
  }

  close = (): void => {
    this.root.close();

    this.contentElement.replaceChildren();
  };

  private handleBackdropClick = (event: MouseEvent): void => {
    if (event.target === this.root) {
      this.close();
    }
  };
}
