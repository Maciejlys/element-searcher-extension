import { EventKey } from "./consts";
import handleFormSubmit from "./handleFormSubmit";

const initilizeElementsRefrences = () => {
  const inputElement = document.getElementById("input");
  const buttonElement = document.getElementById("button");
  const amountFoundElement = document.getElementById("amountFound");

  return [inputElement, buttonElement, amountFoundElement];
};

const attachEventListeners = (inputElement, buttonElement, amountFoundElement) => {
  buttonElement.addEventListener("click", () => handleFormSubmit(inputElement, amountFoundElement));
  inputElement.addEventListener(
    "keypress",
    (event) => event.key === EventKey.ENTER && handleFormSubmit(inputElement, amountFoundElement)
  );
  inputElement.addEventListener("change", () => {
    chrome.storage.sync.set({ input: inputElement.value });
  });
};

document.addEventListener("DOMContentLoaded", function () {
  const references = initilizeElementsRefrences();
  attachEventListeners(...references);

  chrome.storage.sync.get(["input"], (result) => {
    input.value = result.input || "";
  });
});
