import { JSDOM } from "jsdom";
import { describe, expect, test, afterEach, vi } from "vitest";
import backgroundScript from "../src/backgroundScript";

describe("backgroundScript", () => {
  const colors = ["red"];
  const selectors = ["h1"];

  const fakeElementsId = {
    HEADER: "header",
    SUBHEADER: "subheader",
    CONTAINER: "container",
  };

  const setupDOM = (html, _selectors = selectors) => {
    const dom = new JSDOM(html || `
      <div id="container">
        <h1 id="header">This is a test header</h1>
        <h2 id="subheader">This is not a h1</h2>
      </div>
    `);
    global.document = dom.window.document;
    backgroundScript(_selectors, colors);
    const headerElement = dom.window.document.getElementById(fakeElementsId.HEADER);
    const subheaderElement = dom.window.document.getElementById(fakeElementsId.SUBHEADER);
    return { document: dom.window.document, headerElement, subheaderElement };
  };

  afterEach(() => {
    // Clear global document reference
    global.document = undefined;
  });



  

  test("Should override element style", () => {
    const { headerElement, subheaderElement } = setupDOM();
    // Check if header style is override;
    const headerElementStyle = headerElement.style._values;
    expect(headerElementStyle).toStrictEqual({
      outline: "3px red solid",
      position: "relative",
    });

    // Make sure that subheader is untouched
    const subheaderElementStyle = subheaderElement.style._values;
    expect(subheaderElementStyle).toEqual({});
  });

  test('Should override first child style', () => {
    const firstChildHTML = `<div id="parent"><div>child</div></div>`;
    const { document } = setupDOM(firstChildHTML, ['div#parent']);
    const parentElement = document.getElementById('parent');
    const firstChildElement = parentElement.firstChild;
    const firstChildElementStyles = firstChildElement.style._values;
    expect(firstChildElementStyles).toStrictEqual({
      outline: "3px red solid",
      position: "relative",
    });
  });

  test("Should inject a span element", () => {
    const { headerElement } = setupDOM();
    const injectedSpanElement = headerElement.getElementsByTagName("span")[0];
    expect(injectedSpanElement).not.undefined;

    // Check injected span styles
    const spanElementStyle = injectedSpanElement.style._values;
    expect(spanElementStyle).toEqual({
      color: "white",
      position: "absolute",
      "font-size": "14px",
      top: "-17px",
      left: "-3px",
      padding: "0px 8px",
      "padding-top": "0px",
      "padding-right": "8px",
      "padding-bottom": "0px",
      "padding-left": "8px",
      "line-height": "1",
      "background-color": "red",
    });
  });

  test("Should inject element name into span text", () => {
    const { headerElement } = setupDOM();
    const injectedSpanElement = headerElement.getElementsByTagName("span")[0];
    expect(injectedSpanElement).not.undefined;

    // Check tag element value
    const spanElementContent = injectedSpanElement.innerText;
    expect(spanElementContent).toEqual(selectors[0]);
  });

  test.skip("Should override styles in the iframe root", () => {
    // TODO: Implement iframe mock
  });

  test("Should log an error if the selector was not found", () => {
    const consoleSpy = vi.spyOn(console, 'log').mockReturnValue();
    setupDOM('<html></html>', ['h1']);
    expect(consoleSpy).toHaveBeenCalledOnce();
  });
});
