const EventKey = {
  ENTER: 'Enter'
};

const ColorList = [
  "hotpink",
  "deepPink",
  "MediumVioletRed",
  "PaleVioletRed",
  "Coral",
  "Tomato",
  "Orange",
  "Chocolate",
  "Peru",
  "Sienna",
  "SaddleBrown",
  "Maroon",
  "Crimson",
];

const attachEventListeners = () => {
  const inputElement = document.getElementById("input");
  const buttonElement = document.getElementById("button");

  buttonElement.addEventListener("click", () => handleFormSubmit(inputElement));
  inputElement.addEventListener("keypress", event => event.key === EventKey.ENTER && handleFormSubmit(inputElement));
  inputElement.addEventListener("change", () => {
    chrome.storage.sync.set({ input: inputElement.value });
  });
};

document.addEventListener("DOMContentLoaded", function () {
  attachEventListeners();

  chrome.storage.sync.get(["input"], result => {
    input.value = result.input || "";
  });
});

async function handleFormSubmit(input) {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const selectors = input.value.split(" ");

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: backgroundScript,
    args: [selectors, ColorList]
  });
}

const backgroundScript = (selectors, colors) => {
  const injectElementStyle = (element, randomColor) => {
    element.style.outline = `3px ${randomColor} solid`;
    element.style.position = "relative";
    if (element.firstChild.style) {
      element.firstChild.style.outline = `3px ${randomColor} solid`;
      element.firstChild.style.position = "relative";
    }
  };

  const injectSpanElement = (element, randomColor, selector) => {
    const tag = document.createElement("span");
    tag.innerText = selector;
    tag.style.color = "white";
    tag.style.position = "absolute";
    tag.style.fontSize = "14px";
    tag.style.top = "-17px";
    tag.style.left = "-3px";
    tag.style.padding = "0 8px";
    tag.style.lineHeight = "1";
    tag.style.backgroundColor = randomColor;
    element.appendChild(tag);
  };

  const roots = [document.documentElement];
  if (document.querySelector("iframe")) {
    roots.push(document.querySelector("iframe").contentWindow.document.documentElement);
  }
  roots.forEach((root) => {
    selectors.forEach((selector) => {
      try {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        root.querySelectorAll(selector).forEach((element) => {
          injectElementStyle(element, randomColor);
          injectSpanElement(element, randomColor, selector);
        });
      } catch (e) {
        console.log("No components on this page!", selectors, e);
      }
    });
  });
};