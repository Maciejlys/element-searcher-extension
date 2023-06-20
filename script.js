const input = document.getElementById("input");
const button = document.getElementById("button");

document.addEventListener("DOMContentLoaded", function () {
  button.addEventListener("click", callback);
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      button.click();
    }
  });
  input.addEventListener("change", () => {
    chrome.storage.sync.set({ input: input.value });
  });
  chrome.storage.sync.get(["input"], function (result) {
    input.value = result.input || "";
  });
});

async function callback() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const selectors = input.value.split(" ");

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (selectors) => {
      roots = [document.documentElement];
      if (document.querySelector("iframe")) {
        roots.push(document.querySelector("iframe").contentWindow.document.documentElement);
      }
      roots.forEach((root) => {
        selectors.forEach((selector) => {
          try {
            root.querySelectorAll(selector).forEach((element) => {
              element.style.outline = "3px hotpink solid";
              element.style.position = "relative";
              if (element.firstChild.style) {
                element.firstChild.style.outline = "3px hotpink solid";
                element.firstChild.style.position = "relative";
              }
              const tag = document.createElement("span");
              tag.innerText = selector;
              tag.style.color = "white";
              tag.style.position = "absolute";
              tag.style.fontSize = "14px";
              tag.style.top = "-17px";
              tag.style.left = "-3px";
              tag.style.padding = "0 8px";
              tag.style.lineHeight = "1";
              tag.style.backgroundColor = "hotpink";
              element.appendChild(tag);
            });
          } catch (e) {
            console.log("No components on this page!", selectors, e);
          }
        });
      });
    },
    args: [selectors],
  });
}
