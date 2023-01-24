import { FindrReturn } from "@findr/text";

export function getNodeText(node: Node) {
  let text = "";
  const treeWalker = document.createTreeWalker(node, NodeFilter.SHOW_ALL);
  let prevNode;
  while (treeWalker.nextNode()) {
    const current = treeWalker.currentNode;
    const { nodeType } = current;
    if (
      prevNode?.nodeName === "BR" ||
      (prevNode?.nodeType === 1 &&
        window.getComputedStyle(prevNode as HTMLElement, null).display ===
          "block")
    )
      if (text[text.length - 1] !== `\n`) text += `\n`;
    if (nodeType === 3) {
      text += current.textContent;
    }
    prevNode = current;
  }
  return text.trim();
}

export const getTokens = (results: FindrReturn["results"]) => {
  const resultsStrings = [...new Set(results.map((r) => r.match))];
  const tokens = resultsStrings.map((result) => ({ text: result }));
  return tokens;
};
