export class ModalController {
  private readonly content: HTMLElement;
  private readonly closeButton: HTMLButtonElement;

  constructor(private readonly root: HTMLDialogElement) {
    const content = root.querySelector<HTMLElement>("[data-modal-content]");

    const closeButton =
      root.querySelector<HTMLButtonElement>("[data-modal-close]");

    if (!content || !closeButton) {
      throw new Error("ModalController: не найдены обязательные компоненты");
    }

    this.content = content;
    this.closeButton = closeButton;

    this.init();
  }

  private init(): void {
    this.closeButton.addEventListener("click", this.handleClose);

    this.root.addEventListener("click", this.handleBackdropClick);

    this.root.addEventListener("close", this.handleClose);
  }

  open(content: HTMLElement): void {
    this.update(content);

    if (this.root.open) {
      return;
    }

    document.body.classList.add("modal-open");

    this.root.showModal();
  }

  close(): void {
    if (this.root.open) {
      this.root.close();

      document.body.classList.remove("modal-open");

      this.clear();
    }
  }

  update(content: HTMLElement): void {
    if (this.content.firstElementChild !== content) {
      this.content.replaceChildren(content);
    }
  }

  clear(): void {
    this.content.replaceChildren();
  }

  private handleClose = (): void => {
    this.close();
  };

  private handleBackdropClick = (event: MouseEvent): void => {
    if (event.target === this.root) {
      this.close();
    }
  };
}
