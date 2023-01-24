import findr, { FindrParams } from "@findr/text";
import { getNodeText, getTokens } from "./helpers";

interface FindrDomParams extends Omit<FindrParams, "source"> {
  source: Element;
}

export const findrDom = ({
  source,
  target,
  replacement,
  replacementKeys,
  config,
  metadata,
}: FindrDomParams) => {
  const txt = getNodeText(source);
  const response = findr({
    source: txt,
    target,
    replacement,
    replacementKeys,
    metadata,
    config,
  });
  return response;
};
