import { ModalController } from "../controllers/modal-controller";

export function initModal() {
  const modalElement =
    document.querySelector<HTMLDialogElement>("[data-modal]");

  if (!modalElement) {
    throw new Error("Модальное окно не инициализировано");
  }

  return new ModalController(modalElement);
}
