import { Highlighter } from "./Highlighter";
import { FindrConfig, FindrParams } from "@findr/text";
import { getTokens } from "../helpers";
import { findrDom, FindrDomParams } from "..";

interface FindrDomOptions extends FindrConfig {
  highlights?: boolean;
}

export class FindrDom {
  target?: string | RegExp;
  replacement?: FindrDomParams["replacement"];
  metadata?: FindrParams["metadata"];
  source: Element;
  highlighter: Highlighter;
  options?: FindrDomOptions;
  observers: (ResizeObserver | MutationObserver)[];

  constructor({
    source,
    defaultClassName = "highlight",
    debug = false,
    metadata,
  }: {
    source: Element;
    target?: FindrParams["target"];
    options?: FindrDomOptions;
    metadata?: FindrParams["metadata"];
    defaultClassName?: string;
    debug?: boolean;
  }) {
    this.source = source;
    this.highlighter = new Highlighter({
      root: source,
      defaultClassName,
      debug,
    });
    this.metadata = metadata;
    this.observers = [];
  }

  setObservers() {
    const resetHighlight = () => {
      console.log("rehighlighting");
      this.highlighter.removeHighlight();
      if (this.highlighter.tokens?.length)
        this.find({
          target: this.target,
          replacement: this.replacement,
          options: this.options,
          metadata: this.metadata,
        });
    };
    const robserver = new ResizeObserver(resetHighlight);
    const mobserver = new MutationObserver(resetHighlight);
    this.observers = [robserver, mobserver];
    robserver.observe(this.source);
    mobserver.observe(this.source, {
      subtree: true,
      attributes: true,
      characterData: true,
    });
  }

  unsetObservers() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
  }

  setOptions(options: FindrDomOptions) {
    this.options = options;
  }

  setTarget(target: typeof this.target) {
    this.target = target;
  }

  find({
    target,
    replacement,
    replacementKeys,
    metadata,
    options,
  }: {
    target?: FindrParams["target"];
    replacement?: FindrDomParams["replacement"];
    replacementKeys?: FindrDomParams["replacementKeys"];
    metadata?: FindrDomParams["metadata"];
    options?: FindrDomOptions;
  }) {
    this.highlighter.removeHighlight();
    if (target !== null && target !== undefined) this.setTarget(target);
    if (!this.target) return;
    this.replacement = replacement;
    if (metadata) {
      this.metadata = metadata;
    }
    if (options) {
      this.setOptions(options);
    }
    const response = findrDom({
      source: this.source,
      target: this.target,
      replacement,
      replacementKeys,
      metadata,
      config: this.options,
    });
    const tokens = getTokens(response.results);
    this.highlighter.setTokens(tokens);
    if (options?.highlights) {
      const { isWordMatched, isCaseMatched } = this.options || {};
      this.highlighter.highlight({ isWordMatched, isCaseMatched });
      if (!this.observers?.length) this.setObservers();
    }
    return response;
  }

  clean() {
    this.unsetObservers();
    this.highlighter.removeHighlight();
  }
}
