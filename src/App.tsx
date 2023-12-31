import "./App.css";
import { useState } from "react";
import { Highlighted, HighlighterParams } from "./lib/components/Highlighted";
import { Content } from "./components/Content";
import { SearchForm } from "./components/SearchForm";

const defaultTarget = "text to be highlighted";

function App() {
  const [show, setShow] = useState(true);
  const [highlighterState, setHighlighterState] = useState<HighlighterParams>({
    target: defaultTarget,
  });

  const setHighlighterData = ({ target, options }: HighlighterParams) => {
    setHighlighterState({ target, options });
  };

  return (
    <div className="App">
      <SearchForm onSubmit={setHighlighterData} defaultTarget={defaultTarget} />
      <div className="workspace">
        {!show ? null : (
          <div className="card">
            <Highlighted {...highlighterState}>
              <Content />{" "}
            </Highlighted>
          </div>
        )}
      </div>
      <button className="toggle-show" onClick={() => setShow((show) => !show)}>
        {show ? "hide content" : "show content"}
      </button>
    </div>
  );
}

export default App;
