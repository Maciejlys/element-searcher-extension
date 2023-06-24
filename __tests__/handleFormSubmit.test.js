import { describe, expect, test, vi, beforeAll, beforeEach, afterEach } from "vitest";
import handleFormSubmit from "../src/handleFormSubmit";
import { ColorList } from "../src/consts";

describe("handleFormSubmit", () => {

  let executeScriptSpy;

  beforeAll(() => {
    global.chrome = {
      tabs: {
        query: () => { }
      },
      scripting: {
        executeScript: () => { }
      }
    };
    executeScriptSpy = vi.spyOn(global.chrome.scripting, 'executeScript').mockResolvedValue();
  });

  afterEach(() => {
    vi.resetAllMocks();
  })

  test("Should execute script with proper tab id", async () => {
    const queryTabSpy = vi.spyOn(global.chrome.tabs, 'query').mockResolvedValue([{ id: 1 }]);

    await handleFormSubmit({ value: "a" });

    const [queryTabArgs] = queryTabSpy.mock.calls[0];
    expect(queryTabArgs).toEqual({ active: true, currentWindow: true });

    const [executeScriptArgs] = executeScriptSpy.mock.calls[0];
    const { target, args } = executeScriptArgs;
    expect(target).toEqual({ tabId: 1 });
    expect(args).toEqual([
      ['a'],
      ColorList
    ]);
  });

  test('Should pass proper selectors as argument', async () => {
    const expectedArgs = ['a', '.kek', 'max'];
    await handleFormSubmit({ value: expectedArgs.join(' ') });

    const [executeScriptArgs] = executeScriptSpy.mock.calls[0];
    expect(executeScriptArgs.args).toEqual([
      expectedArgs,
      ColorList
    ]);
  });

});
