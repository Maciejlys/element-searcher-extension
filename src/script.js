import { EventKey } from './consts';
import handleFormSubmit from './handleFormSubmit';

export const initializeElementsReferences = () => {
  const inputElement = document.getElementById('input');
  const buttonElement = document.getElementById('button');
  const amountFoundElement = document.getElementById('amountFound');

  return { inputElement, buttonElement, amountFoundElement };
};

export const attachEventListeners = (
  inputElement,
  buttonElement,
  amountFoundElement,
) => {
  buttonElement.addEventListener('click', () =>
    handleFormSubmit(inputElement, amountFoundElement),
  );
  inputElement.addEventListener(
    'keypress',
    (event) =>
      event.key === EventKey.ENTER &&
      handleFormSubmit(inputElement, amountFoundElement),
  );
  inputElement.addEventListener('change', () => {
    chrome.storage.sync.set({ input: inputElement.value });
  });
};

global.document &&
  document.addEventListener('DOMContentLoaded', () => {
    const { inputElement, buttonElement, amountFoundElement } =
      initializeElementsReferences();
    attachEventListeners(inputElement, buttonElement, amountFoundElement);

    chrome.storage.sync.get(['input'], (result) => {
      inputElement.value = result.input || '';
    });
  });
