import { ColorList } from "./consts";
import backgroundScript from "./backgroundScript";

const handleFormSubmit = async (input, amountFound) => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const selectors = input.value ? input.value.split(" ") : [];

  await chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: backgroundScript,
      args: [selectors, ColorList],
    },
    (res) => {
      const { result } = res[0];
      amountFound.innerText = `${result} elements found with given selectors`;
    }
  );
};

export default handleFormSubmit;
