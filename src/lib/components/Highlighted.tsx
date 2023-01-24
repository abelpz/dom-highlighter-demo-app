import { FindrConfig } from "@findr/text";
import { useEffect, useRef } from "react";
import { FindrDom } from "../classes/FindrDom";

export interface HighlighterParams {
  target: string;
  options?: FindrConfig;
}

interface HighlightedProps extends HighlighterParams {
  children: React.ReactNode;
}

/**
 * The component in charge of highlighting it's children
 */
export const Highlighted = ({
  target,
  options,
  children,
}: HighlightedProps) => {
  const findrDomRef = useRef<FindrDom | null>(null);
  useEffect(() => {
    const sourceElement = sourceRef.current;
    if (sourceElement) {
      const findrDom = new FindrDom({ source: sourceElement });
      findrDomRef.current = findrDom;
      return () => {
        console.log("cleanig highlights");
        findrDom.clean();
      };
    }
  }, []);
  useEffect(() => {
    const findrDom = findrDomRef.current;
    if (findrDom instanceof FindrDom)
      findrDom.find({
        target: target,
        options: { highlights: true, ...options },
      });
  }, [target, options]);
  const sourceRef = useRef<HTMLDivElement>(null);
  return <div ref={sourceRef}>{children}</div>;
};
