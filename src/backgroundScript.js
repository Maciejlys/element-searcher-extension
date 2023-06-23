export default backgroundScript = (selectors, colors) => {
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
