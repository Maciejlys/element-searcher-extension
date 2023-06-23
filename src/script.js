import { EventKey } from "./consts";
import handleFormSubmit from "./handleFormSubmit";

const attachEventListeners = () => {
  const inputElement = document.getElementById("input");
  const buttonElement = document.getElementById("button");

  buttonElement.addEventListener("click", () => handleFormSubmit(inputElement));
  inputElement.addEventListener(
    "keypress",
    (event) => event.key === EventKey.ENTER && handleFormSubmit(inputElement)
  );
  inputElement.addEventListener("change", () => {
    chrome.storage.sync.set({ input: inputElement.value });
  });
};

document.addEventListener("DOMContentLoaded", function () {
  attachEventListeners();

  chrome.storage.sync.get(["input"], (result) => {
    input.value = result.input || "";
  });
});
