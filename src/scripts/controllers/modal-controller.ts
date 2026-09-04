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
    this.closeButton.addEventListener("click", this.close);

    this.root.addEventListener("click", this.handleBackdropClick);

    this.root.addEventListener("close", this.close);
  }

  open(content: HTMLElement): void {
    this.update(content);

    document.body.classList.add("modal-open");

    this.root.showModal();
  }

  close = (): void => {
    this.root.close();

    document.body.classList.remove("modal-open");

    this.clear();
  };

  update(content: HTMLElement): void {
    this.content.replaceChildren(content);
  }

  clear = (): void => {
    this.content.replaceChildren();
  };

  private handleBackdropClick = (event: MouseEvent): void => {
    if (event.target === this.root) {
      this.close();
    }
  };
}
