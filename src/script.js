import { EventKey } from "./consts";
import handleFormSubmit from "./handleFormSubmit";

let inputElement, buttonElement, amountFoundElement;

const initilizeElementsRefrences = () => {
  inputElement = document.getElementById("input");
  buttonElement = document.getElementById("button");
  amountFoundElement = document.getElementById("amountFound");
};

const attachEventListeners = () => {
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
  initilizeElements();
  attachEventListeners();

  chrome.storage.sync.get(["input"], (result) => {
    input.value = result.input || "";
  });
});
