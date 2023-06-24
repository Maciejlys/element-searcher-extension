import { JSDOM } from "jsdom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { attachEventListeners, initializeElementsReferences } from "../src/script";

describe("attachEventListeners", () => {

  let dom;

  global.chrome = {
    storage: {
      sync: {
        set: () => { }
      }
    },
    scripting: {
      executeScript: () => { }
    },
    tabs: {
      query: () => [{ id: 1 }]
    }
  };

  const setupDOM = () => {
    const dom = new JSDOM(`
      <div id="container">
        <input id="input" type="text" />
        <button id="button"><span>Find</span></button>
      </div>
    `);
    global.document = dom.window.document;
    return { dom };
  };

  beforeEach(() => {
    let setup = setupDOM();
    dom = setup.dom;
  });

  test('Should attach event listeners to input element', () => {
    const elementReferences = initializeElementsReferences();
    const addEventListenerSpy = vi.spyOn(elementReferences[0], 'addEventListener');
    attachEventListeners(...elementReferences);

    expect(addEventListenerSpy).toHaveBeenCalledTimes(2);
    const [firstCall, secondCall] = addEventListenerSpy.mock.calls;
    expect(firstCall[0]).toEqual('keypress');
    expect(secondCall[0]).toEqual('change');

    addEventListenerSpy.mockRestore();
  });

  test('Should attach event listener to button element', () => {
    const elementReferences = initializeElementsReferences();
    const addEventListenerSpy = vi.spyOn(elementReferences[1], 'addEventListener');
    attachEventListeners(...elementReferences);

    expect(addEventListenerSpy).toHaveBeenCalledOnce();
    const [firstCall] = addEventListenerSpy.mock.calls;
    expect(firstCall[0]).toEqual('click');

    addEventListenerSpy.mockRestore();
  });

  test('Should storage sync input', () => {
    const elementReferences = initializeElementsReferences();
    const inputElement = elementReferences[0];
    attachEventListeners(...elementReferences);

    const storageSpy = vi.spyOn(global.chrome.storage.sync, 'set');
    inputElement.dispatchEvent(new dom.window.Event('change'));
    expect(storageSpy).toBeCalledTimes(1);
  });

  // test('Should trigger handleFormSubmit on button click', () => {
  //   const { dom } = setupDOM();
  //   const elementReferences = initializeElementsReferences();
  //   const inputElement = elementReferences[1];
  //   attachEventListeners(...elementReferences);

  //   vi.mock("./handleFormSubmit");

  //   const executeScriptSpy = vi.spyOn(chrome.scripting, 'executeScript').mockResolvedValue();
  //   console.log(inputElement);
  //   inputElement.dispatchEvent(new dom.window.Event('click'));
  //   console.log(executeScriptSpy.mock.calls);
  // });

  // test('Should trigger handleFormSubmit on input enter key', () => {

  // });

});
