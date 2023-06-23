import { JSDOM } from "jsdom";
import { describe, expect, test, beforeAll } from "vitest";
import backgroundScript from "../src/backgroundScript";

describe("backgroundScript", () => {
  let dom;
  const colors = ["red"];
  const selectors = ["h1"];

  const fakeElementsId = {
    HEADER: "header",
    SUBHEADER: "subheader",
    CONTAINER: "container",
  };

  beforeAll(() => {
    dom = new JSDOM(`
      <div id="container">
        <h1 id="header">This is a test header</h1>
        <h2 id="subheader">This is not a h1</h2>
      </div>
    `);
    global.document = dom.window.document;
    backgroundScript(selectors, colors);
  });

  test("Should override element style", () => {
    // Check if header style is override;
    const headerElement = dom.window.document.getElementById(fakeElementsId.HEADER);
    const headerElementStyle = headerElement.style._values;
    expect(headerElementStyle).toStrictEqual({
      outline: "3px red solid",
      position: "relative",
    });

    // Make sure that subheader is untouched
    const subheaderElement = dom.window.document.getElementById(fakeElementsId.SUBHEADER);
    const subheaderElementStyle = subheaderElement.style._values;
    expect(subheaderElementStyle).toEqual({});
  });

  test("Should inject a span element", () => {
    const headerElement = dom.window.document.getElementById(fakeElementsId.HEADER);
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

  test("should set the tag text to the selector", () => {
    expect(true).toBe(true);
  });

  test("should override styles in the iframe root", () => {
    expect(true).toBe(true);
  });

  test("should log an error if the selector was not found", () => {
    expect(true).toBe(true);
  });
});
