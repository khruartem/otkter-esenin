import { CommunicationCotroller } from "../controllers/communication-controller";

export function initCommunication(): void {
  const communications = document.querySelectorAll("[data-communication]");

  communications.forEach((communication) => {
    new CommunicationCotroller(communication as HTMLElement);
  });
}
