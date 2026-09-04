export function cloneTemplate<T extends HTMLElement>(
  template: HTMLTemplateElement,
): T {
  const content = template.content.firstElementChild?.cloneNode(true);

  if (!(content instanceof HTMLElement)) {
    throw new Error("PhotoModalView: template content not found");
  }

  return content as T;
}
