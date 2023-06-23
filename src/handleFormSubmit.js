import { ColorList } from "./consts";
import backgroundScript from "./backgroundScript";

const handleFormSubmit = async (input) => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const selectors = input.value.split(" ");

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: backgroundScript,
    args: [selectors, ColorList],
  });
};

export default handleFormSubmit;
